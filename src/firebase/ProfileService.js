import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
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


function ShowThatShit(userId, arg) {
	console.log(userId);
	console.log(arg);
	// alert(JSON.stringify(arg.docs, null, 2));
	return arg;
}


export async function getProfiles(userId) {
	return ShowThatShit(userId, (
		await getDocs(
			collection(
				db,
				"usuarios",
				userId,
				"perfiles"
			)
		)
	).docs.map(
		item => ({
			id: item.id,
			...item.data()
		})
	)
	);
}

export async function createProfile(userId, profile) {
	return {
		id: (
			await addDoc(
				collection(
					db,
					"usuarios",
					userId,
					"perfiles"
				),
				profile
			)
		).id,
		...profile
	};
}

export async function deleteProfile(userId, profileId) {
	await deleteDoc(
		doc(
			db,
			"usuarios",
			userId,
			"perfiles",
			profileId
		)
	);
}

export async function updateProfile(userId, profileId, changes) {
	await updateDoc(
		doc(
			db,
			"usuarios",
			userId,
			"perfiles",
			profileId
		),
		changes
	);
}