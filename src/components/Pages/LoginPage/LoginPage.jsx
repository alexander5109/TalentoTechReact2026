import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import ApdForm from "../../common/ApdForm/ApdForm";
import ApdInput from "../../common/ApdInput/ApdInput";
import ApdLabelH3 from "../../common/ApdLabelH3/ApdLabelH3";
import ApdSection from "../../common/ApdSection/ApdSection";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdFormField from "../../common/ApdFormField/ApdFormField";
import ApdNavLink from "../../common/ApdNavLink/ApdNavLink";

import ApdFeedback from "../../common/ApdFeedback/ApdFeedback";

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

		<ApdSection>
			<ApdLabelH3 upper="Apd Finder" lower="Iniciar sesión" />

			<ApdPrettyP>
				¿Todavía no tenés una cuenta?{" "}
				<ApdNavLink variant="accent" to="/crearUsuario">
					Crear usuario
				</ApdNavLink>
			</ApdPrettyP>
			<ApdForm onSubmit={handleLogin}>

				<ApdFormField
					label="Correo electrónico"
					htmlFor="email"
				>
					<ApdInput
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</ApdFormField>

				<ApdFormField
					label="Contraseña"
					htmlFor="password"
				>
					<ApdInput
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</ApdFormField>

				<ApdFeedback feedback={feedback} />

				<ApdButton
					type="submit"
					disabled={loading}
				>
					{loading
						? "Ingresando..."
						: "Ingresar"}
				</ApdButton>

			</ApdForm>

		</ApdSection>

	);

}