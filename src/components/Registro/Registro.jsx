import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from "./Registro.module.css"


const Registro = () => {

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		nombre: "",
		apellido: "",
		titulo: "",
		anioEgreso: "",
		distrito: "",
		avatar: null
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};
	const handleImage = (e) => {
		const file = e.target.files[0];
		setFormData(prev => ({
			...prev,
			avatar: file

		}));
	};

	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const auth = getAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null); // Reseteamos cualquier error previo
		if (formData.password !== formData.confirmPassword) {

			setError("Las contraseñas no coinciden.");

			return;
		}
		try {
			// Intentamos crear el nuevo usuario en Firebase
			createUserWithEmailAndPassword(
				auth,
				formData.email,
				formData.password
			);
			await setDoc(doc(db, "usuarios", userCredential.user.uid), {

				email: userCredential.user.email,

				nombre: formData.nombre,

				apellido: formData.apellido,

				titulo: formData.titulo,

				anioEgreso: Number(formData.anioEgreso),

				distrito: formData.distrito,

				avatar: "",

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
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Nombre</label>
					<input
						type="text"
						value={formData.nombre}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Apellido</label>
					<input
						type="text"
						value={formData.apellido}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Contraseña</label>
					<input
						type="password"
						value={formData.password}
						onChange={handleChange}
						required
						placeholder="Mínimo 6 caracteres"
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Confirmar Contraseña</label>
					<input
						type="password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						placeholder="Mínimo 6 caracteres"
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Título</label>
					<input
						type="text"
						value={formData.titulo}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Año de Egreso</label>
					<input
						type="text"
						value={formData.anioEgreso}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Distrito local</label>
					<input
						type="text"
						value={formData.distrito}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Avatar</label>
					<input
						type="file"
						value={formData.avatar}
						onChange={handleImage}
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