import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

import PendingPostulationsWidget from "../../PendingPostulationsWidget/PendingPostulationsWidget"

export default function NavBar() {
	return (
		<nav className={styles.navbar}>

			<div className={styles.logoSection}>
				<Link to="/" className={styles.logo}>
					APD Finder
				</Link>
			</div>

			<div className={styles.links}>
				<Link to="/" className={styles.link}>
					Inicio
				</Link>

				<Link to="/ofertas" className={styles.link}>
					Ofertas
				</Link>

				<Link to="/about" className={styles.link}>
					Quienes somos
				</Link>

				<Link to="/contacto" className={styles.link}>
					Contacto
				</Link>
			</div>

			<div className={styles.widget}>
				<PendingPostulationsWidget />
			</div>

		</nav>
	)
}