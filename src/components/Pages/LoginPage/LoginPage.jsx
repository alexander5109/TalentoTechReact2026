import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import APDForm from "../../common/APDForm/APDForm";
import APDInput from "../../common/APDInput/APDInput";
import APDLabelH3 from "../../common/APDLabelH3/APDLabelH3";
import APDSection from "../../common/APDSection/APDSection";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import APDButton from "../../common/APDButton/APDButton";
import APDFormField from "../../common/APDFormField/APDFormField";
import ApdNavLink from "../../common/ApdNavLink/ApdNavLink";

import APDFeedback from "../../common/APDFeedback/APDFeedback";

export default function LoginPage() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState(null);

	const navigate = useNavigate();

	async function handleLogin(e) {

		e.preventDefault();

		setLoading(true);
		setFeedback(null);

		try {

			const auth = getAuth();

			await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			navigate("/");

		}
		catch (err) {

			switch (err.code) {

				case "auth/invalid-credential":
				case "auth/wrong-password":
				case "auth/user-not-found":
					setFeedback({
						type: "warning",
						message: "Correo electrónico o contraseña incorrectos."
					});
					break;

				case "auth/invalid-email":
					setFeedback({
						type: "warning",
						message: "El correo electrónico no es válido."
					});
					break;

				case "auth/too-many-requests":
					setFeedback({
						type: "error",
						message: "Demasiados intentos. Intente nuevamente más tarde."
					});
					break;

				default:
					setFeedback({
						type: "error",
						message: "No fue posible iniciar sesión.",
						error: err
					});
			}

		}
		finally {

			setLoading(false);

		}

	}

	return (

		<APDSection>
			<APDLabelH3 upper="APD Finder" lower="Iniciar sesión" />

			<ApdPrettyP>
				¿Todavía no tenés una cuenta?{" "}
				<ApdNavLink variant="accent" to="/crearUsuario">
					Crear usuario
				</ApdNavLink>
			</ApdPrettyP>
			<APDForm onSubmit={handleLogin}>

				<APDFormField
					label="Correo electrónico"
					htmlFor="email"
				>
					<APDInput
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</APDFormField>

				<APDFeedback feedback={feedback} />

				<APDButton
					type="submit"
					disabled={loading}
				>
					{loading
						? "Ingresando..."
						: "Ingresar"}
				</APDButton>

			</APDForm>

		</APDSection>

	);

}