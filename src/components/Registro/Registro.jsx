import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from "./Registro.module.css"


const Registro = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const auth = getAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Reseteamos cualquier error previo
		try {
			// Intentamos crear el nuevo usuario en Firebase
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await setDoc(doc(db, "usuarios", userCredential.user.uid), {
				email: userCredential.user.email,
				role: "user",
				createdAt: serverTimestamp()
			});
			navigate("/");
		}


		catch (error) {
			// Aquí es donde manejamos el caso específico que nos interesa
			if (error.code === 'auth/email-already-in-use') {
				// Usamos window.confirm para hacer la pregunta al usuario
				const quiereLoguearse = window.confirm(
					'Este correo electrónico ya está registrado. ¿Deseaintentar iniciar sesión ? '
				);
				if (quiereLoguearse) {
					// Si el usuario confirma, lo redirigimos a la página de login
					navigate('/iniciarSesion');
				} else {
					// Si el usuario cancela, lo redirigimos a la página de inicio
					navigate('/');

				}

			}
			else if (error.code === "auth/weak-password") {

				setError("La contraseña debe tener al menos 6 caracteres.");

			} else if (error.code === "auth/invalid-email") {

				setError("El correo electrónico no es válido.");

			}
			else {
				// Para cualquier otro error (contraseña débil, email inválido, etc.) mostramos un mensaje genérico.
				setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
				console.error("Error en el registro:", error.message);

			}

		}

	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Crear una nueva cuenta</h2>

			<form className={styles.form} onSubmit={handleSubmit}>

				<div className={styles.formGroup}>
					<label>Correo electrónico</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Nombre</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Contraseña</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Mínimo 6 caracteres"
					/>
				</div>

				{error && (
					<div className={styles.error}>
						{error}
					</div>
				)}

				<button
					type="submit"
					className={`${styles.button} ${styles.primary}`}
				>
					Registrarse
				</button>

			</form>
		</div>

	);
};
export default Registro;