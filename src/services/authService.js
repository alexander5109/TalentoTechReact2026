import { createUserWithEmailAndPassword } from "firebase/auth";
import {
	doc,
	serverTimestamp,
	setDoc
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import { subirAvatar } from "./subirAvatar";

export async function registrarUsuario({
	email,
	password,
	nombre,
	apellido,
	titulo,
	anioEgreso,
	distrito,
	avatar
}) {

	let avatarUrl = "";

	if (avatar) {
		avatarUrl = await subirAvatar(avatar);
	}

	const userCredential =
		await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

	await setDoc(
		doc(db, "usuarios", userCredential.user.uid),
		{

			email: userCredential.user.email,

			nombre,

			apellido,

			titulo,

			anioEgreso: Number(anioEgreso),

			distrito,

			avatar: avatarUrl,

			role: "user",

			createdAt: serverTimestamp()

		}
	);

	return userCredential.user;
}