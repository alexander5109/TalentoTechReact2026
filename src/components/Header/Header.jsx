import styles from "./Header.module.css"
import ApdH1TitleSubtitle from "./../common/ApdH1TitleSubtitle/ApdH1TitleSubtitle"
import { useLocation } from "react-router-dom"
import { useAuth } from "./../../context/AuthContext";

export default function Header() {





	const { hasFeature } = useAuth();

	const removeAds = hasFeature("remove_ads");


	const location = useLocation()
	let subtitle = ""

	if (location.pathname === "/") {
		subtitle = "Home"
	}
	else if (location.pathname.startsWith("/ofertas")) {
		subtitle = "Ofertas";
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

	else if (location.pathname === "/userAccountSettings") {
		subtitle = "Mi cuenta"
	}
	else {
		subtitle = "Ruta sin cabecera"
	}

	return (
		<header
			className={`${styles.header} ${!removeAds ? styles.premiumPromo : ""
				}`}
		>
			<ApdH1TitleSubtitle
				upper="Buscador de Actos Públicos Digitales"
				// upper="Mis Actos Públicos Digitales"
				lower={subtitle}
			/>
		</header>
	)
}
