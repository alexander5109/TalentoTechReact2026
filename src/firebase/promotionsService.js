import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

const promotionsCollection = collection(db, "promotions");
const featuresCollection = collection(db, "features");

export async function getFeatures() {
	const snapshot = await getDocs(featuresCollection);
	return snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));
}

export async function getPromotions() {
	const snapshot = await getDocs(promotionsCollection);
	return snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	}));
}


export async function getPromotion(promotionId) {
	const snapshot = await getDoc(doc(db, "promotions", promotionId));
	if (!snapshot.exists())
		return null;
	return { id: snapshot.id, ...snapshot.data() };

}

export async function createPromotion(promotion) {
	const docRef = await addDoc(promotionsCollection, promotion);
	return { id: docRef.id, ...promotion };

}

export async function updatePromotion(promotionId, changes) {
	await updateDoc(doc(db, "promotions", promotionId), changes);
}

export async function disablePromotion(promotionId) {
	await updateDoc(doc(db, "promotions", promotionId), { activa: false });

}