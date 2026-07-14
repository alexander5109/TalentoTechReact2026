import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormUserAccount from "../../FormUserAccount/FormUserAccount";
import { registrarUsuario } from "../../../services/authService";

export default function SignUpPage() {

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function handleRegister(data) {

		setError(null);
		setLoading(true);

		try {

			await registrarUsuario(data);

			navigate("/");

		}
		catch (err) {
			switch (err.code) {
				case "auth/email-already-in-use":
					setError("El correo electrónico ya está en uso");
					break;

				case "auth/weak-password":
					setError("La contraseña debe tener al menos 6 caracteres.");
					break;

				case "auth/invalid-email":
					setError("El correo electrónico no es válido.");
					break;

				default:
					setError("Ocurrió un error al registrar el usuario.");
			}

		}
		finally {

			setLoading(false);

		}

	}

	return (

		<FormUserAccount
			title="Crear cuenta"
			submitText="Registrarse"
			initialData={{}}
			showPasswordFields={true}
			loading={loading}
			error={error}
			editableEmailAndPassword={true}
			onSubmit={handleRegister}

		/>

	);

}