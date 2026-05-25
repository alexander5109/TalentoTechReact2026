import styles from "./Header.module.css"
import SectionTitle from "../common/SectionTitle/SectionTitle"
import { useLocation } from "react-router-dom"

export default function Header() {
	const location = useLocation()
	let subtitle = ""

	if (location.pathname === "/") {
		subtitle = "Home"
	}
	else if (location.pathname === "/ofertas") {
		subtitle = "Ofertas"
	}
	else if (location.pathname === "/about") {
		subtitle = "About us"
	}
	else if (location.pathname === "/contacto") {
		subtitle = "Contacto"
	}
	else if (location.pathname === "/miPerfil") {
		subtitle = "Mi perfil"
	}
	else {
		subtitle = "Ruta sin cabecera"
	}

	return (
		<header className={styles.header}>
			<SectionTitle
				upper="Mis Actos Públicos Digitales"
				lower={subtitle}
			/>
		</header>
	)
}
