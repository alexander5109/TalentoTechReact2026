import { useEffect, useState } from "react";
import styles from "./UserAccountSettingsPage.module.css";
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
import ApdButton from "../../common/ApdButton/ApdButton";
import SearchProfileCard from "../../common/SearchProfileCard/SearchProfileCard";

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

	return <ApdLayoutStack as="main" margin="2rem">
		<ApdH3TitleSubtitle upper="Apd Finder" lower="Mi cuenta"></ApdH3TitleSubtitle>
		<ApdLayoutStack direction="row" gap="2rem" wrap="wrap">
			<ApdPanel flex="4 1 300px" as="section">
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
			<ApdPanel flex="5 1 500px" as="section">
				<ApdH3>Beneficios</ApdH3>
				<ApdLayoutStack as="form">
					<ApdH4>Ingresar código de promoción</ApdH4>
					<ApdInput type="text"></ApdInput>
					<ApdLayoutStack direction="row" align="center">
						<ApdButton >Ingresar</ApdButton>
					</ApdLayoutStack>
				</ApdLayoutStack>

				<ApdLayoutGrid >
					<ApdPanel>Sin publicidad</ApdPanel>
					<ApdPanel>Sin asdasd</ApdPanel>
					<ApdPanel>Sin asdas</ApdPanel>
					<ApdPanel>asdasd asd</ApdPanel>
					<ApdPanel>asdasd asd</ApdPanel>
					<ApdPanel>asdasd asd</ApdPanel>
					<ApdPanel>asdasd asd</ApdPanel>
					<ApdPanel>asdasd asd</ApdPanel>
				</ApdLayoutGrid>
			</ApdPanel>
		</ApdLayoutStack>
	</ApdLayoutStack>

}