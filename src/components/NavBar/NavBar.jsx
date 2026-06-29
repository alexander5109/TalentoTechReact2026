import { NavLink } from "react-router-dom"

import styles from "./NavBar.module.css"

import { usePendingPostulations } from "../../context/PendingPostulationsContext"

import { useAuth } from "../../context/AuthContext";


export default function NavBar() {


	const { user, login, logout } = useAuth();

	const isAdmin = user?.role === "admin";


	const { pendingPostulations } = usePendingPostulations()

	// console.log(user);

	function navClass(isActive) {
		return isActive
			? `${styles.link} ${styles.active}`
			: styles.link
	}


	function renderRightLinks() {

		if (!user) {
			return (
				<>
					<NavLink
						to="/iniciarSesion"
						className={({ isActive }) => navClass(isActive)}
					>
						Iniciar sesión
					</NavLink>

					<NavLink
						to="/registro"
						className={({ isActive }) => navClass(isActive)}
					>
						Crear usuario
					</NavLink>
				</>
			);
		}

		if (isAdmin) {
			return (
				<>
					<NavLink
						to="/adminPanel"
						className={({ isActive }) => navClass(isActive)}
					>
						Panel Admin
					</NavLink>

					<NavLink
						to=""
						onClick={logout}
						className={styles.pendingButton}
					>
						Cerrar sesión
					</NavLink>
				</>
			);
		}

		return (
			<>
				<NavLink
					to="/myProfiles"
					className={({ isActive }) =>
						isActive
							? `${styles.pendingButton} ${styles.activePending}`
							: styles.pendingButton
					}
				>
					👤 Mis perfiles
				</NavLink>

				<NavLink
					to="/pendingPostulations"
					className={({ isActive }) =>
						isActive
							? `${styles.pendingButton} ${styles.activePending}`
							: styles.pendingButton
					}
				>
					📝 Postulaciones ({pendingPostulations.length})
				</NavLink>


				<NavLink
					to=""
					onClick={logout}
					className={styles.pendingButton}
				>
					Cerrar sesión
				</NavLink>
			</>
		);
	}

	return (
		<nav className={styles.navbar}>
			<NavLink
				to="/"
				className={styles.logo}
			>
				APD Finder
			</NavLink>

			<div className={styles.centralLinks}>

				<NavLink
					to="/"
					className={({ isActive }) => navClass(isActive)}
				>
					Inicio
				</NavLink>

				<NavLink
					to="/about"
					className={({ isActive }) => navClass(isActive)}
				>
					About us
				</NavLink>

				<NavLink
					to="/contacto"
					className={({ isActive }) => navClass(isActive)}
				>
					Contacto
				</NavLink>

				<NavLink
					to="/ofertas"
					className={({ isActive }) => navClass(isActive)}
				>
					Ofertas
				</NavLink>

			</div>



			<div className={styles.rightLinks}>
				{renderRightLinks()}
			</div>


		</nav >
	)
}