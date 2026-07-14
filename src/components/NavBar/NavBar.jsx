

import styles from "./NavBar.module.css"

import { usePendingPostulations } from "../../context/PendingPostulationsContext"

import { useAuth } from "../../context/AuthContext";
import APDNavLink from "../common/APDNavLink/APDNavLink";


export default function NavBar() {

	const { user, login, logout } = useAuth();

	const isAdmin = user?.role === "admin";


	const { pendingPostulations } = usePendingPostulations()

	function renderCentralLinks() {
		return <>
			<APDNavLink to="/"> Inicio </APDNavLink >
			<APDNavLink to="/about"> About us </APDNavLink>
			<APDNavLink to="/contacto"> Contacto </APDNavLink>
			<APDNavLink to="/ofertas"> Ofertas </APDNavLink>

		</>
	}


	function renderRightLinks() {
		if (!user) {
			return (
				<>
					<APDNavLink to="/iniciarSesion" >Iniciar sesión </APDNavLink>
					<APDNavLink to="/crearUsuario" > Crear usuario </APDNavLink>
				</>
			);
		} else {
			return (
				<>
					<APDNavLink to="/userPendingPostulations" variant="accent"> 📝 Postulaciones ({pendingPostulations.length})</APDNavLink>
					<APDNavLink to="/userSearchProfiles" variant="accent">🔎 Mis búsquedas</APDNavLink>
					<APDNavLink to="/userAccountSettings" variant="accent">⚙️ Mi cuenta</APDNavLink>
					{isAdmin && (<APDNavLink to="/userAdminPanel" variant="accent">🛠️ Admin Panel</APDNavLink>)}
					<APDNavLink to="" variant="danger" onClick={logout}  >Cerrar sesión</APDNavLink>
				</>
			);
		}
	}

	return (
		<nav className={styles.navbar}>
			<APDNavLink to="/" variant="logo" >APD Finder</APDNavLink>
			<div className={styles.centralLinks}>{renderCentralLinks()}</div>
			<div className={styles.rightLinks}>{renderRightLinks()}</div>
		</nav >
	)
}