import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./config";

// const snapshot = await getDocs(
// 	collection(
// 		db,
// 		"usuarios",
// 		"OqgQMj4iP2S83imvVmexCoDsgSk1",
// 		"perfiles"
// 	)
// );
// console.log(
// 	snapshot.docs.map(doc => ({
// 		id: doc.id,
// 		...doc.data()
// 	}))
// );


// function ShowThatShit(userId, arg) {
// 	console.log(userId);
// 	console.log(arg);
// 	alert(JSON.stringify(arg.docs, null, 2));
// 	return arg;
// }
async function getUserRefAndData(userId) {

	const userRef = doc(db, "usuarios", userId);

	const snapshot = await getDoc(userRef);

	return {
		userRef,
		user: snapshot.data()
	};

}
export async function getProfiles(userId) {

	const snapshot = await getDoc(
		doc(db, "usuarios", userId)
	);

	const user = snapshot.data();

	return user?.profiles ?? [];

}


export async function createProfile(userId, profile) {

	const newProfile = {
		id: crypto.randomUUID(),
		...profile
	};

	await updateDoc(
		doc(db, "usuarios", userId),
		{
			profiles: arrayUnion(newProfile)
		}
	);

	return newProfile;
}

export async function deleteProfile(userId, profileId) {

	const { userRef, user } = await getUserRefAndData(userId);

	const profiles = (user.profiles ?? []).filter(
		profile => profile.id !== profileId
	);

	await updateDoc(userRef, { profiles });

}

export async function updateProfile(userId, profileId, changes) {

	const { userRef, user } = await getUserRefAndData(userId);

	const profiles = (user.profiles ?? []).map(profile =>
		profile.id === profileId
			? { ...profile, ...changes }
			: profile
	);

	await updateDoc(userRef, { profiles });

}