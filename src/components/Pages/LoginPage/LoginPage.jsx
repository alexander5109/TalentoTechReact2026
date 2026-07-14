import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import APDButton from "../../common/APDButton/APDButton";
import APDFormField from "../../common/APDFormField/APDFormField";
import ApdNavLink from "../../common/ApdNavLink/ApdNavLink";

import styles from "./LoginPage.module.css";
import APDFeedback from "../../common/APDFeedback/APDFeedback";

export default function LoginPage() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	async function handleLogin(e) {

		e.preventDefault();

		setLoading(true);
		setError(null);

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
					setError("Correo electrónico o contraseña incorrectos.");
					break;

				case "auth/invalid-email":
					setError("El correo electrónico no es válido.");
					break;

				case "auth/too-many-requests":
					setError("Demasiados intentos. Intente nuevamente más tarde.");
					break;

				default:
					setError("No fue posible iniciar sesión.");

			}

		}
		finally {

			setLoading(false);

		}

	}

	return (

		<TextContainer>

			<SectionTitleH3>
				Iniciar sesión
			</SectionTitleH3>

			<PrettyText>
				¿Todavía no tenés una cuenta?{" "}
				<ApdNavLink variant="accent" to="/crearUsuario">
					Crear usuario
				</ApdNavLink>
			</PrettyText>

			<form
				className={styles.form}
				onSubmit={handleLogin}
			>

				<APDFormField
					label="Correo electrónico"
					name="email"
					type="email"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<APDFormField
					label="Contraseña"
					name="password"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<APDFeedback type="error">
					{error}
				</APDFeedback>

				<APDButton
					type="submit"
					disabled={loading}
				>
					{loading
						? "Ingresando..."
						: "Ingresar"}
				</APDButton>

			</form>

		</TextContainer>

	);

}