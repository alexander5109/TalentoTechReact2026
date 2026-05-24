import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { usePendingPostulations } from "../../context/PendingPostulationsContext"
import PendingPostulationsWidget from "../PendingPostulationsWidget/PendingPostulationsWidget"

export default function NavBar() {
	const { getPendingCount } = usePendingPostulations()
	return (
		<nav className={styles.navbar}>
			<div className={styles.logoSection}>
				<Link to="/" className={styles.logo} > APD Finder </Link>
			</div>
			<div className={styles.links}>
				<Link to="/" className={styles.link}> Inicio </Link>
				<Link to="/ofertas" className={styles.link}> Ofertas </Link>
				<Link to="/about" className={styles.link}> About us </Link>
				<Link to="/contacto" className={styles.link}> Contacto </Link>
				<Link to="/miPerfil" className={styles.link}> Mi Perfil </Link>
			</div>
			<div className={styles.widget}>
				<Link to="/pendingPostulations">
					<PendingPostulationsWidget pendingCount={getPendingCount()} />
				</Link>
			</div>
		</nav>
	)
}