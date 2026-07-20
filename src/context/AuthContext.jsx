import { useEffect, createContext, useState, useContext } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./../firebase/config";
import { getFeatures, getPromotion } from '../firebase/promotionsService';




export const AuthContext = createContext();

export function useAuth() {
	// Hook personalizado
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth debe ser usado dentro de un AuthProvider");
	}
	return context;
};


export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);



	const [availableFeatures, setAvailableFeatures] = useState([]);
	const [availableFeaturesByIdMap, setAvailableFeaturesByIdMap] = useState({});
	const [userFeatures, setUserFeatures] = useState({});


	useEffect(() => {
		async function resolveUserFeatures(activePromotions = []) {
			const result = {};
			for (const active of activePromotions) {
				const promotion = await getPromotion(active.promotionId);
				if (!promotion)
					continue;
				const now = new Date();
				const from = active.from.toDate();
				const to = active.to.toDate();
				if (now < from || now > to)
					continue;
				for (const feature of promotion.features ?? []) {
					result[feature] = true;
				}
			}
			return result;
		}

		async function initialize() {

			const unsubscribe = onAuthStateChanged(
				auth,
				async (currentUser) => {

					try {

						// cargar catálogo de features
						const features = await getFeatures();

						setAvailableFeatures(features);

						const featureMap = features.reduce((acc, feature) => {
							acc[feature.id] = feature;
							return acc;
						}, {});

						setAvailableFeaturesByIdMap(featureMap);



						if (!currentUser) {

							setUser(null);
							setUserFeatures({});
							return;
						}


						// cargar usuario firestore

						const userDocRef = doc(
							db,
							"usuarios",
							currentUser.uid
						);

						const userDocSnap = await getDoc(userDocRef);


						if (userDocSnap.exists()) {

							const userData = userDocSnap.data();


							const activeFeatures =
								await resolveUserFeatures(
									userData.activePromotions
								);


							setUserFeatures(activeFeatures);


							setUser({
								...currentUser,
								...userData,
								role: userData.role ?? "user"
							});

						}
						else {

							setUser({
								...currentUser,
								role: "user"
							});

						}


					}
					finally {
						setLoading(false);
					}

				}
			);


			return unsubscribe;

		}


		initialize();

	}, []);


	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	};
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	};
	function logout() {
		signOut(auth);
	};
	function hasFeature(featureId) {
		return !!userFeatures[featureId];
	}



	return (
		<AuthContext.Provider value={{
			user,
			availableFeatures,
			availableFeaturesMap: availableFeaturesByIdMap,
			userFeatures,
			hasFeature,
			loading,
			signup,
			login,
			logout
		}}>
			{!loading && children}
		</AuthContext.Provider >
	);
};