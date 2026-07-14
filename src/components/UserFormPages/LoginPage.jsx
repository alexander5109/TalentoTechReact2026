import { useState } from 'react';
import { NavLink } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import APDButton from '../common/APDButton/APDButton';
// import styles from "./BaseUserForm.css"

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("Usuario logueado:", user);
				alert("¡Inicio de sesión exitoso!");
				navigate('/'); //
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Error en el login:", errorCode, errorMessage);
				alert("Error: " + errorMessage);
			});
	};
	return (
		<div>
			<h2>Iniciar Sesión</h2>
			<p>¿No tenés una cuenta? <NavLink to="/registro">Registrate aquí</NavLink></p>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Correo electrónico"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/><input
					type="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<APDButton type="submit">Ingresar</APDButton>
			</form>
		</div>

	);
};