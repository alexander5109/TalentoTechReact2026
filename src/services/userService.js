import {
	doc,
	getDoc,
	updateDoc,
	serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import { subirAvatar } from "./subirAvatar";




export async function actualizarUsuario({
	nombre,
	apellido,
	titulo,
	anioEgreso,
	distrito,
	archivo
}) {
	const user = auth.currentUser;

	if (!user) {
		throw new Error("No hay usuario autenticado.");
	}


	const data = {

		nombre,

		apellido,

		titulo,

		anioEgreso: Number(anioEgreso),

		distrito,

		updatedAt: serverTimestamp()

	};


	if (archivo) {

		const url = await subirAvatar(archivo);

		data.avatarUrl = url;
		console.log(data.avatarUrl);

	}


	const ref = doc(
		db,
		"usuarios",
		user.uid
	);


	await updateDoc(
		ref,
		data
	);

}



export async function obtenerUsuarioActual() {

	const user = auth.currentUser;

	if (!user) {
		throw new Error("No hay usuario autenticado.");
	}

	const ref = doc(
		db,
		"usuarios",
		user.uid
	);

	const snapshot = await getDoc(ref);

	if (!snapshot.exists()) {
		throw new Error("El usuario no existe en Firestore.");
	}

	return {
		id: snapshot.id,
		...snapshot.data()
	};

}