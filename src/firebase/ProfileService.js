import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function getProfiles(userId) {
	const snapshot = await getDoc(doc(db, "usuarios", userId));
	const user = snapshot.data();
	return user?.profiles ?? [];

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