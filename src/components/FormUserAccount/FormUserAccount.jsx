import React, { useEffect, useState } from 'react';
import ApdButton from '../common/ApdButton/ApdButton';
import AvatarPicker from "./AvatarPicker/AvatarPicker"
import ApdInput from '../common/ApdInput/ApdInput';
import ApdFeedback from '../common/ApdFeedback/ApdFeedback';
import ApdPanel from '../common/ApdPanel/ApdPanel';
import ApdH3TitleSubtitle from '../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle';
import ApdLayoutStack from '../common/ApdLayoutStack/ApdLayoutStack';
import ApdLabel from '../common/ApdLabel/ApdLabel';


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
		<ApdLayoutStack as="form" onSubmit={handleSubmit}>
			<ApdLayoutStack>
				<ApdLabel htmlFor="email">Correo electrónico</ApdLabel>
				<ApdInput
					id="email"
					name="email"
					type="email"
					disabled={!editableEmailAndPassword}
					value={formData.email}
					onChange={handleChange}
					required
					autoComplete="email"
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="nombre">Nombre</ApdLabel>
				<ApdInput
					id="nombre"
					name="nombre"
					value={formData.nombre}
					onChange={handleChange}
					required
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="apellido">Apellido</ApdLabel>
				<ApdInput
					id="apellido"
					name="apellido"
					value={formData.apellido}
					onChange={handleChange}
					required
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="password">Contraseña</ApdLabel>
				<ApdInput
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
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="confirmPassword">Confirmar Contraseña</ApdLabel>
				<ApdInput
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
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="titulo">Título</ApdLabel>
				<ApdInput
					id="titulo"
					name="titulo"
					value={formData.titulo}
					onChange={handleChange}
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="anioEgreso">Año de Egreso</ApdLabel>
				<ApdInput
					id="anioEgreso"
					name="anioEgreso"
					value={formData.anioEgreso}
					onChange={handleChange}
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="distrito">Distrito local</ApdLabel>
				<ApdInput
					id="distrito"
					name="distrito"
					value={formData.distrito}
					onChange={handleChange}
				/>
			</ApdLayoutStack>

			<AvatarPicker
				file={formData.archivo}
				currentImage={initialData.avatarUrl}
				onChange={handleImage}
			/>

			<ApdFeedback feedback={feedbackLocal ?? feedback} />

			<ApdButton type="submit" disabled={loading}>
				{loading ? "Procesando..." : submitText}
			</ApdButton>

		</ApdLayoutStack >
	);
};