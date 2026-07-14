import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./FormUserAccount.module.css"
import { registrarUsuario } from "../../services/authService";
import APDButton from '../common/APDButton/APDButton';
import AvatarPicker from "../AvatarPicker/AvatarPicker"


export default function FormUserAccount({

	title,
	submitText,

	initialData,

	showPasswordFields = true,

	loading = false,

	error = null,
	editableEmail = false,

	onSubmit

}) {
	console.log("Form render", initialData);

	const [formData, setFormData] = useState({

		email: initialData.email ?? "",

		password: "",

		confirmPassword: "",

		nombre: initialData.nombre ?? "",

		apellido: initialData.apellido ?? "",

		titulo: initialData.titulo ?? "",

		anioEgreso: initialData.anioEgreso ?? "",

		distrito: initialData.distrito ?? "",

		archivo: null

	});
	const [formError, setFormError] = useState(null);
	const [initialized, setInitialized] = useState(false);


	useEffect(() => {

		if (!initialData || initialized)
			return;


		setFormData(prev => ({

			...prev,

			email: initialData.email ?? "",
			nombre: initialData.nombre ?? "",
			apellido: initialData.apellido ?? "",
			titulo: initialData.titulo ?? "",
			anioEgreso: initialData.anioEgreso ?? "",
			distrito: initialData.distrito ?? ""

		}));

		setInitialized(true);


	}, [initialData, initialized]);

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

	const navigate = useNavigate();

	const handleSubmit = (e) => {

		e.preventDefault();

		if (showPasswordFields && formData.password !== formData.confirmPassword) {
			alert("Las contraseñas no coinciden.");
			return;
		}
		onSubmit(formData);

	};
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>
				{title}
			</h2>
			<form className={styles.form} onSubmit={handleSubmit}>

				<div className={styles.formGroup}>
					<label htmlFor="email">
						Correo electrónico
					</label>
					<input
						disabled={!editableEmail}
						name="email"
						type="email"
						autoComplete="email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="nombre">Nombre</label>
					<input
						name="nombre"
						type="text"
						value={formData.nombre}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="apellido">Apellido</label>
					<input
						name="apellido"
						type="text"
						value={formData.apellido}
						onChange={handleChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="password">Contraseña</label>
					<input
						name="password"
						type="password"
						autoComplete="new-password"
						value={formData.password}
						onChange={handleChange}
						required
						placeholder="Mínimo 6 caracteres"
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="confirmPassword">Confirmar Contraseña</label>
					<input
						name="confirmPassword"
						type="password"
						autoComplete="new-password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
						placeholder="Mínimo 6 caracteres"
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="titulo">Título</label>
					<input
						name="titulo"
						type="text"
						value={formData.titulo}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="anioEgreso">Año de Egreso</label>
					<input
						name="anioEgreso"
						type="text"
						value={formData.anioEgreso}
						onChange={handleChange}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="distrito">Distrito local</label>
					<input
						name="distrito"
						type="text"
						value={formData.distrito}
						onChange={handleChange}
					/>
				</div>
				<AvatarPicker

					file={formData.archivo}

					currentImage={initialData.avatarUrl}

					onChange={handleImage}

				/>


				{(formError || error) && (
					<div className={styles.error}>
						{formError ?? error}
					</div>
				)}

				<APDButton type="submit" disabled={loading} >
					{loading ? "Procesando..." : submitText}
				</APDButton>

			</form>
		</div>

	);
};