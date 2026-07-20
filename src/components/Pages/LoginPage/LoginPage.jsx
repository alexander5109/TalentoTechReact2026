import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import ApdInput from "./../../common/ApdInput/ApdInput";
import ApdH3TitleSubtitle from "./../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdPrettyP from "./../../common/ApdPrettyP/ApdPrettyP";
import ApdButton from "./../../common/ApdButton/ApdButton";
import ApdNavLink from "../../common/ApdNavLink/ApdNavLink";
import ApdLayoutStack from "./../../common/ApdLayoutStack/ApdLayoutStack";
import ApdLabel from "./../../common/ApdLabel/ApdLabel";

import ApdFeedback from "./../../common/ApdFeedback/ApdFeedback";

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

	return <ApdPanel>
		<ApdH3TitleSubtitle upper="Apd Finder" lower="Iniciar sesión" />

		<ApdPrettyP>
			¿Todavía no tenés una cuenta?{" "}
			<ApdNavLink variant="accent" to="/crearUsuario">
				Crear usuario
			</ApdNavLink>
		</ApdPrettyP>
		<ApdLayoutStack as="form" onSubmit={handleLogin}>
			<ApdLayoutStack>
				<ApdLabel htmlFor="email">Correo electrónico</ApdLabel>

				<ApdInput
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</ApdLayoutStack>

			<ApdLayoutStack>
				<ApdLabel htmlFor="password">Contraseña</ApdLabel>

				<ApdInput
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</ApdLayoutStack>

			<ApdFeedback feedback={feedback} />

			<ApdButton
				type="submit"
				disabled={loading}
			>
				{loading
					? "Ingresando..."
					: "Ingresar"}
			</ApdButton>

		</ApdLayoutStack>

	</ApdPanel>

}