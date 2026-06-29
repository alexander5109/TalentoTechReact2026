import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyANx4G82SsGUu44CW3IUJuHdF-r1iBVtKc",
	authDomain: "my-no-ecommerce-reactjs.firebaseapp.com",
	projectId: "my-no-ecommerce-reactjs",
	storageBucket: "my-no-ecommerce-reactjs.firebasestorage.app",
	messagingSenderId: "859973073128",
	appId: "1:859973073128:web:03cc37e82f6e5dad27315d"
};
const app = initializeApp(firebaseConfig);
// Si agregaste Analytics verás esto además.
// const analytics = getAnalytics(app);




export const db = getFirestore(app);
export const auth = getAuth(app);