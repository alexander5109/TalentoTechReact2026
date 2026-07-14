import { useEffect, useState } from "react";

import FormUserAccount from "../../FormUserAccount/FormUserAccount";

import { obtenerUsuarioActual, actualizarUsuario } from "../../../services/userService";

export default function UserAccountSettingsPage() {

	const [usuario, setUsuario] = useState(null);

	const [loading, setLoading] = useState(true);

	const [saving, setSaving] = useState(false);

	const [error, setError] = useState(null);

	useEffect(() => {
		async function cargarUsuario() {
			try {
				const data = await obtenerUsuarioActual();
				setUsuario(data);
			}
			catch (err) {
				setError("No fue posible cargar los datos del usuario.");
			}
			finally {
				setLoading(false);
			}
		}
		cargarUsuario();
	}, []);

	async function handleUpdate(data) {
		setSaving(true);
		setError(null);
		try {
			console.log("Datos enviados a actualizar:", data);
			await actualizarUsuario(data);

			const actualizado = await obtenerUsuarioActual();
			console.log("Datos recibidos tras actualizar:", actualizado);
			setUsuario(actualizado);
		} catch (err) {
			console.error("Error actualizando usuario:", err);
			setError(
				`No fue posible guardar los cambios.\nCódigo: ${err.code}\nMensaje: ${err.message}`
			);
		}
		finally {
			setSaving(false);
		}

	}

	if (loading)
		return <p>Cargando...</p>;

	if (error && !usuario)
		return <p>{error}</p>;

	return (

		<FormUserAccount
			title="Mi cuenta"
			submitText="Guardar cambios"
			initialData={usuario}
			showPasswordFields={false}
			loading={saving}
			error={error}
			editableEmail={false}
			onSubmit={handleUpdate}

		/>

	);

}