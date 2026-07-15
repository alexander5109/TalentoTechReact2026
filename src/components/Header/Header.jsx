import styles from "./Header.module.css"
import APDLabelH1 from "../common/APDLabelH1/APDLabelH1"
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
	else if (location.pathname === "/userPendingPostulations") {
		subtitle = "Mis postulaciones"
	}
	else if (location.pathname === "/userSearchProfiles") {
		subtitle = "Mis perfiles"
	}
	else if (location.pathname === "/userAccountSettings") {
		subtitle = "Mi cuenta"
	}
	else {
		subtitle = "Ruta sin cabecera"
	}

	return (
		<header className={styles.header}>
			<APDLabelH1
				upper="Buscador de Actos Públicos Digitales"
				// upper="Mis Actos Públicos Digitales"
				lower={subtitle}
			/>
		</header>
	)
}
