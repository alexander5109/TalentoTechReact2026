import React, { useEffect, useState } from 'react';
import styles from "./FormUserAccount.module.css"
import APDButton from '../common/APDButton/APDButton';
import AvatarPicker from "./AvatarPicker/AvatarPicker"
import APDInput from '../common/APDInput/APDInput';
import APDForm from '../common/APDForm/APDForm';
import APDFormField from '../common/APDFormField/APDFormField';
import APDFeedback from '../common/APDFeedback/APDFeedback';
import APDSection from '../common/APDSection/APDSection';
import APDLabelH3 from '../common/APDLabelH3/APDLabelH3';


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
		<APDForm onSubmit={handleSubmit}>

			<APDFormField
				label="Correo electrónico"
				htmlFor="email"
			>
				<APDInput
					id="email"
					name="email"
					type="email"
					disabled={!editableEmailAndPassword}
					value={formData.email}
					onChange={handleChange}
					required
					autoComplete="email"
				/>
			</APDFormField>

			<APDFormField
				label="Nombre"
				htmlFor="nombre"
			>
				<APDInput
					id="nombre"
					name="nombre"
					value={formData.nombre}
					onChange={handleChange}
					required
				/>
			</APDFormField>

			<APDFormField
				label="Apellido"
				htmlFor="apellido"
			>
				<APDInput
					id="apellido"
					name="apellido"
					value={formData.apellido}
					onChange={handleChange}
					required
				/>
			</APDFormField>

			<APDFormField
				label="Contraseña"
				htmlFor="password"
			>
				<APDInput
					id="password"
					name="password"
					type="password"
					autoComplete="new-password"
					placeholder="Mínimo 6 caracteres"
					value={formData.password}
					onChange={handleChange}
					disabled={!editableEmailAndPassword}
					required
				/>
			</APDFormField>

			<APDFormField
				label="Confirmar Contraseña"
				htmlFor="confirmPassword"
			>
				<APDInput
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					autoComplete="new-password"
					placeholder="Mínimo 6 caracteres"
					value={formData.confirmPassword}
					onChange={handleChange}
					disabled={!editableEmailAndPassword}
					required
				/>
			</APDFormField>

			<APDFormField
				label="Título"
				htmlFor="titulo"
			>
				<APDInput
					id="titulo"
					name="titulo"
					value={formData.titulo}
					onChange={handleChange}
				/>
			</APDFormField>

			<APDFormField
				label="Año de Egreso"
				htmlFor="anioEgreso"
			>
				<APDInput
					id="anioEgreso"
					name="anioEgreso"
					value={formData.anioEgreso}
					onChange={handleChange}
				/>
			</APDFormField>

			<APDFormField
				label="Distrito local"
				htmlFor="distrito"
			>
				<APDInput
					id="distrito"
					name="distrito"
					value={formData.distrito}
					onChange={handleChange}
				/>
			</APDFormField>

			<AvatarPicker
				file={formData.archivo}
				currentImage={initialData.avatarUrl}
				onChange={handleImage}
			/>

			<APDFeedback feedback={feedbackLocal ?? feedback} />

			<APDButton
				type="submit"
				disabled={loading}
			>
				{loading ? "Procesando..." : submitText}
			</APDButton>

		</APDForm>
	);
};