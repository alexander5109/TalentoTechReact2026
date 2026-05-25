import { NavLink } from "react-router-dom"

import styles from "./NavBar.module.css"

import { usePendingPostulations } from "../../context/PendingPostulationsContext"

export default function NavBar() {

	const { pendingPostulations } = usePendingPostulations()

	return (
		<nav className={styles.navbar}>

			<div className={styles.logoSection}>
				<NavLink
					to="/"
					className={styles.logo}
				>
					APD Finder
				</NavLink>
			</div>

			<div className={styles.links}>

				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive
							? `${styles.link} ${styles.active}`
							: styles.link
					}
				>
					Inicio
				</NavLink>

				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive
							? `${styles.link} ${styles.active}`
							: styles.link
					}
				>
					About us
				</NavLink>

				<NavLink
					to="/contacto"
					className={({ isActive }) =>
						isActive
							? `${styles.link} ${styles.active}`
							: styles.link
					}
				>
					Contacto
				</NavLink>

				<NavLink
					to="/ofertas"
					className={({ isActive }) =>
						isActive
							? `${styles.link} ${styles.active}`
							: styles.link
					}
				>
					Ofertas
				</NavLink>

			</div>

			<div className={styles.rightSection}>

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