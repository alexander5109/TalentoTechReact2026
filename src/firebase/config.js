import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
// Si agregaste Analytics verás esto además.
// const analytics = getAnalytics(app);




export const db = getFirestore(app);
export const auth = getAuth(app);


async function exportFirestore() {

	const collections = [
		"features",
		"promotions",
		"usuarios"
	];

	const backup = {};

	for (const collectionName of collections) {

		const snapshot = await getDocs(collection(db, collectionName));

		backup[collectionName] = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		}));

	}

	console.log(backup);

	const json = JSON.stringify(backup, null, "\t");

	const blob = new Blob([json], {
		type: "application/json"
	});

	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = "firestore-export.json";
	a.click();

	URL.revokeObjectURL(url);
}

// await exportFirestore();