

import styles from "./NavBar.module.css"

import { usePendingPostulations } from "../../context/PendingPostulationsContext"

import { useAuth } from "../../context/AuthContext";
import ApdNavLink from "../common/ApdNavLink/ApdNavLink";


export default function NavBar() {

	const { user, login, logout } = useAuth();

	const isAdmin = user?.role === "admin";


	const { pendingPostulations } = usePendingPostulations()


	function renderRightLinks() {
		if (!user) {
			return (
				<>
					<ApdNavLink to="/iniciarSesion" >Iniciar sesión </ApdNavLink>
					<ApdNavLink to="/crearUsuario" > Crear usuario </ApdNavLink>
				</>
			);
		} else {
			return (
				<>
					<ApdNavLink to="/userPendingPostulations" variant="accent"> 📝 Postulaciones ({pendingPostulations.length})</ApdNavLink>
					<ApdNavLink to="/userAccountSettings" variant="accent">⚙️ Mi cuenta</ApdNavLink>
					{isAdmin && (<ApdNavLink to="/userAdminPanel" variant="accent">🛠️ Admin Panel</ApdNavLink>)}
					<ApdNavLink to="" variant="danger" onClick={logout}  >Cerrar sesión</ApdNavLink>
				</>
			);
		}
	}

	return (
		<nav className={styles.navbar}>
			<ApdNavLink to="/" variant="logo" >Apd Finder</ApdNavLink>
			<div className={styles.centralLinks}>
				<ApdNavLink to="/"> Inicio </ApdNavLink >
				<ApdNavLink to="/about"> About us </ApdNavLink>
				<ApdNavLink to="/contacto"> Contacto </ApdNavLink>
				<ApdNavLink to="/ofertas"> Ofertas </ApdNavLink>
			</div>
			<div className={styles.rightLinks}>{renderRightLinks()}</div>
		</nav >
	)
}