import React, { useEffect, useState } from 'react';
import styles from "./FormUserAccount.module.css"
import APDButton from '../common/APDButton/APDButton';
import AvatarPicker from "../common/AvatarPicker/AvatarPicker"
import APDFormField from '../common/APDFormField/APDFormField';
import APDFeedback from '../common/APDFeedback/APDFeedback';


export default function FormUserAccount({
	title,
	submitText,
	initialData = {},
	showPasswordFields = true,
	loading,
	feedback,
	onFeedbackClear,
	editableEmailAndPassword = false,
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
	const [feedbackLocal, setFeedbackLocal] = useState(null);

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

		if (feedbackLocal) {
			setFeedbackLocal(null);
		}

		if (feedback) {
			onFeedbackClear();
		}

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

	const handleSubmit = (e) => {
		e.preventDefault();
		setFeedbackLocal(null);
		if (showPasswordFields && formData.password !== formData.confirmPassword) {
			setFeedbackLocal({
				type: "warning",
				message: "Las contraseñas no coinciden.",
			});
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
				<APDFormField
					label="Correo electrónico"
					name="email"
					type="email"
					disabled={!editableEmailAndPassword}
					value={formData.email}
					onChange={handleChange}
					required
					autoComplete="email"
				/>

				<APDFormField
					label="Nombre"
					name="nombre"
					value={formData.nombre}
					onChange={handleChange}
					required
				/>

				<APDFormField
					label="Apellido"
					name="apellido"
					value={formData.apellido}
					onChange={handleChange}
					required
				/>
				<APDFormField
					label="Contraseña"
					name="password"
					type="password"
					autoComplete="new-password"
					placeholder="Mínimo 6 caracteres"
					value={formData.password}
					onChange={handleChange}
					disabled={!editableEmailAndPassword}
					required
				/>
				<APDFormField
					label="Confirmar Contraseña"
					name="confirmPassword"
					type="password"
					autoComplete="new-password"
					placeholder="Mínimo 6 caracteres"
					value={formData.confirmPassword}
					onChange={handleChange}
					disabled={!editableEmailAndPassword}
					required
				/>
				<APDFormField
					label="Título"
					name="titulo"
					value={formData.titulo}
					onChange={handleChange}
				/>

				<APDFormField
					label="Año de Egreso"
					name="anioEgreso"
					value={formData.anioEgreso}
					onChange={handleChange}
				/>

				<APDFormField
					label="Distrito local"
					name="distrito"
					value={formData.distrito}
					onChange={handleChange}
				/>


				<AvatarPicker
					file={formData.archivo}
					currentImage={initialData.avatarUrl}
					onChange={handleImage}
				/>

				<APDFeedback feedback={feedbackLocal ?? feedback} />

				<APDButton type="submit" disabled={loading} >
					{loading ? "Procesando..." : submitText}
				</APDButton>

			</form>
		</div >

	);
};