import { Timestamp, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function getProfiles(userId) {
	const snapshot = await getDoc(doc(db, "usuarios", userId));
	const user = snapshot.data();
	return user?.profiles ?? [];

}

export async function activatePromotion(usuario, promotion) {

	// console.log(usuario)
	// console.log(promotion)
	if (!usuario)
		throw new Error("No hay usuario autenticado.");

	const userRef = doc(db, "usuarios", usuario.id);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists())
		throw new Error("El usuario no existe.");

	const userData = userSnap.data();

	const activePromotions = userData.activePromotions ?? [];

	const alreadyActivated = activePromotions.some(
		item => item.promotionId === promotion.id
	);

	if (alreadyActivated)
		throw new Error("La promoción ya fue activada.");

	activePromotions.push({
		promotionId: promotion.id,
		activatedAt: Timestamp.now()
	});

	await updateDoc(userRef, {
		activePromotions
	});

	return activePromotions;
}


export async function createProfile(userId, profile) {
	const newProfile = { id: crypto.randomUUID(), ...profile };
	await updateDoc(doc(db, "usuarios", userId), { profiles: arrayUnion(newProfile) });
	return newProfile;
}
async function _getUserRefAndData(userId) {
	const userRef = doc(db, "usuarios", userId);
	const snapshot = await getDoc(userRef);
	return {
		userRef,
		user: snapshot.data()
	};
}

export async function deleteProfile(userId, profileId) {
	const { userRef, user } = await _getUserRefAndData(userId);
	const profiles = (user.profiles ?? []).filter(profile => profile.id !== profileId);
	await updateDoc(userRef, { profiles });
}

export async function updateProfile(userId, profileId, changes) {
	const { userRef, user } = await _getUserRefAndData(userId);
	const profiles = (user.profiles ?? []).map(profile =>
		profile.id === profileId
			? { ...profile, ...changes }
			: profile
	);
	await updateDoc(userRef, { profiles });
}