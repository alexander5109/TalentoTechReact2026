import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./BaseUserForm.css"
import { registrarUsuario } from "../../services/authService";
import APDButton from '../common/APDButton/APDButton';



export default function BaseUserForm() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		nombre: "",
		apellido: "",
		titulo: "",
		anioEgreso: "",
		distrito: "",
		archivo: null
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
			archivo: file

		}));
	};

	const [error, setError] = useState(null);
	const navigate = useNavigate();



	const handleSubmit = async (e) => {


		e.preventDefault();
		setError(null);
		if (formData.password !== formData.confirmPassword) {
			setError("Las contraseñas no coinciden.");
			return;
		}
		try {
			setLoading(true); await registrarUsuario({

				email: formData.email,

				password: formData.password,

				nombre: formData.nombre,

				apellido: formData.apellido,

				titulo: formData.titulo,

				anioEgreso: formData.anioEgreso,

				distrito: formData.distrito,

				archivo: formData.archivo

			});
			navigate("/");
		}
		catch (error) {
			// Aquí es donde manejamos el caso específico que nos interesa
			if (error.code === 'auth/email-already-in-use') {
				// Usamos window.confirm para hacer la pregunta al usuario
				const quiereLoguearse = window.confirm(
					'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión ? '
				);
				if (quiereLoguearse) {
					// Si el usuario confirma, lo redirigimos a la página de login
					navigate('/iniciarSesion');
				}
				else {
					// Si el usuario cancela, lo redirigimos a la página de inicio
					// navigate('/');
					// dejame en paz

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
		finally {
			setLoading(false);
		}

	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Crear una nueva cuenta</h2>

			<form className={styles.form} onSubmit={handleSubmit}>

				<div className={styles.formGroup}>
					<label>Correo electrónico</label>
					<input
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Nombre</label>
					<input
						name="nombre"
						type="text"
						value={formData.nombre}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Apellido</label>
					<input
						name="apellido"
						type="text"
						value={formData.apellido}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Contraseña</label>
					<input
						name="password"
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
						name="confirmPassword"
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
						name="titulo"
						type="text"
						value={formData.titulo}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Año de Egreso</label>
					<input
						name="anioEgreso"
						type="text"
						value={formData.anioEgreso}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Distrito local</label>
					<input
						name="distrito"
						type="text"
						value={formData.distrito}
						onChange={handleChange}
					/>
				</div>
				<AvatarPicker
					archivo={formData.archivo}
					onChange={handleImage}


				/>



				{error && (
					<div className={styles.error}>
						{error}
					</div>
				)}

				<APDButton disabled={loading} > {loading ? "Creando cuenta..." : "Registrarse"} </APDButton>

			</form>
		</div>

	);
};