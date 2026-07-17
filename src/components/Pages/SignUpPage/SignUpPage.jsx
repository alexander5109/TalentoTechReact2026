import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormUserAccount from "../../FormUserAccount/FormUserAccount";
import { registrarUsuario } from "../../../services/authService";
import ApdLabelH3 from "../../common/ApdLabelH3/ApdLabelH3";
import ApdSection from "../../common/ApdSection/ApdSection";
import ApdForm from "../../common/ApdForm/ApdForm";

export default function SignUpPage() {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState(null);

	async function handleRegister(data) {

		setFeedback(null);
		setLoading(true);

		try {

			await registrarUsuario(data);

			navigate("/");

		}
		catch (err) {
			switch (err.code) {
				case "auth/email-already-in-use":
					setFeedback({
						type: "warning",
						message: "El correo electrónico ya está en uso"
					});
					break;

				case "auth/weak-password":
					setFeedback({
						type: "warning",
						message: "La contraseña debe tener al menos 6 caracteres."
					});
					break;

				case "auth/invalid-email":
					setFeedback({
						type: "warning",
						message: "El correo electrónico no es válido."
					});
					break;

				default:
					setFeedback({
						type: "error",
						message: "Ocurrió un error al registrar el usuario.",
						errror: err
					});
			}

		}
		finally {

			setLoading(false);

		}

	}

	return (

		<ApdSection>
			<ApdLabelH3 upper="Apd Finder" lower="Crear Usuario"
			></ApdLabelH3>
			<FormUserAccount
				title="Crear cuenta"
				submitText="Registrarse"
				initialData={{}}
				showPasswordFields={true}
				loading={loading}
				feedback={feedback}
				onFeedbackClear={() => setFeedback(null)}
				editableEmailAndPassword={true}
				onSubmit={handleRegister}

			/>

		</ApdSection>
	);
}