import { useEffect, useState } from "react";

import FormUserAccount from "./../../FormUserAccount/FormUserAccount";

import { obtenerUsuarioActual, actualizarUsuario } from "./../../../services/userService";
import ApdFeedback from "./../../common/ApdFeedback/ApdFeedback";
import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "./../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdSpinner from "./../../common/ApdSpinner/ApdSpinner";
import ApdLayoutStack from "../../common/ApdLayoutStack/ApdLayoutStack";
import ApdH3 from "../../common/ApdH3/ApdH3";
import ApdInput from "../../common/ApdInput/ApdInput";
import ApdH4 from "../../common/ApdH4/ApdH4";
import ApdLayoutGrid from "../../common/ApdLayoutGrid/ApdLayoutGrid";

export default function UserAccountSettingsPage() {

	const [usuario, setUsuario] = useState(null);

	const [loading, setLoading] = useState(true);

	const [saving, setSaving] = useState(false);

	const [feedback, setFeedback] = useState(null);

	useEffect(() => {
		async function cargarUsuario() {
			try {
				const data = await obtenerUsuarioActual();
				setUsuario(data);
			}
			catch (err) {
				setFeedback({
					type: "error",
					message: "No fue posible cargar los datos del usuario."
				});
			}
			finally {
				setLoading(false);
			}
		}
		cargarUsuario();
	}, []);

	async function handleUpdate(data) {
		setSaving(true);
		setFeedback(null);
		try {
			// console.log("Datos enviados a actualizar:", data);
			await actualizarUsuario(data);

			const actualizado = await obtenerUsuarioActual();
			setUsuario(actualizado);
			setFeedback({
				type: "success",
				message: "Cambios guardados."
			});
		} catch (err) {
			setFeedback({
				type: "error",
				message: "No fue posible cambiar los datos.",
				error: err
			});
		}
		finally {
			setSaving(false);
		}

	}

	if (loading)
		return <ApdSpinner />;

	if (!usuario && feedback)
		return <ApdFeedback feedback={feedback}></ApdFeedback>;

	return <>
		<ApdH3TitleSubtitle upper="Apd Finder" lower="Mi cuenta"></ApdH3TitleSubtitle>

		<ApdLayoutStack direction="row">
			<ApdPanel as="section">
				<ApdH3>Datos Personales</ApdH3>
				<FormUserAccount
					title="Mi cuenta"
					submitText="Guardar cambios"
					initialData={usuario}
					showPasswordFields={false}
					loading={saving}
					feedback={feedback}
					onFeedbackClear={() => setFeedback(null)}
					editableEmailAndPassword={false}
					onSubmit={handleUpdate}

				/>
			</ApdPanel >
			<ApdPanel as="section">
				<ApdH3>Beneficios</ApdH3>
				<ApdLayoutStack>
					<ApdH4>Incresar código de promoción</ApdH4>
					<ApdInput type="text"></ApdInput>
				</ApdLayoutStack>
				<ApdLayoutGrid>


				</ApdLayoutGrid>
			</ApdPanel>
		</ApdLayoutStack>
	</>

}