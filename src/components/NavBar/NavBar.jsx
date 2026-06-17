import { NavLink } from "react-router-dom"

import styles from "./NavBar.module.css"

import { usePendingPostulations } from "../../context/PendingPostulationsContext"

export default function NavBar() {

	const { pendingPostulations } = usePendingPostulations()

	function navClass(isActive) {
		return isActive
			? `${styles.link} ${styles.active}`
			: styles.link
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
				<NavLink
					to="/myProfiles"
					className={({ isActive }) =>
						isActive
							? `${styles.pendingButton} ${styles.activePending}`
							: styles.pendingButton
					}
				>
					👤 Mis Perfiles
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
			</div>

		</nav>
	)
}