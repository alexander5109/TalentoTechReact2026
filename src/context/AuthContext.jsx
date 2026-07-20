import { useEffect, createContext, useState, useContext } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./../firebase/config";
import { getFeatures } from '../firebase/promotionsService';

export const AuthContext = createContext();
export const useAuth = () => {
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
	const availableFeatures = await getFeatures();
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
		return !!availableFeatures[featureId];
	}

	async function resolveUserFeatures(userData) {
		const result = {};
		for (const active of userData.activePromotions ?? []) {
			const promotion = await getPromotion(active.promotionId);
			if (!promotion) continue;
			const now = new Date();
			const from = promotion.vigenciaDesde.toDate();
			const to = promotion.vigenciaHasta.toDate();
			if (now < from || now > to)
				continue;
			promotion.features.forEach(feature => {
				result[feature] = true;
			});
		}
		return result;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const userDocRef = doc(db, "usuarios", currentUser.uid);
				const userDocSnap = await getDoc(userDocRef);
				if (userDocSnap.exists() && userDocSnap.data().role ===
					'admin') {
					setUser({ ...currentUser, role: 'admin' });
				} else {
					setUser({ ...currentUser, role: 'user' });
				}
			} else {
				setUser(null);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, [auth, db]);


	return (
		<AuthContext.Provider value={{
			user,
			availableFeatures,
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