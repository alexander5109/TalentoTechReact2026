import styles from "./NavBar.module.css";

import { usePendingPostulations } from "../../context/PendingPostulationsContext";
import { useAuth } from "../../context/AuthContext";

import ApdLayoutStack from "../common/ApdLayoutStack/ApdLayoutStack";
import ApdNavLink from "../common/ApdNavLink/ApdNavLink";

export default function NavBar() {

	const { user, logout } = useAuth();
	const { pendingPostulations } = usePendingPostulations();

	const isAdmin = user?.role === "admin";

	return (

		<ApdLayoutStack
			as="nav"
			direction="row"
			align="center"
			justify="space-between"
			wrap="wrap"
			gap="1rem"
			className={styles.navbar}
		>

			<ApdNavLink to="/" variant="logo">
				Apd Finder
			</ApdNavLink>

			<ApdLayoutStack
				direction="row"
				grow={1}
				justify="center"
				align="center"
				wrap="wrap"
				gap="0.7rem"
			>

				<ApdNavLink to="/about">About us</ApdNavLink>
				<ApdNavLink to="/contacto">Contacto</ApdNavLink>
				<ApdNavLink to="/ofertas">Ofertas</ApdNavLink>

			</ApdLayoutStack>

			<ApdLayoutStack
				direction="row"
				justify="flex-end"
				align="center"
				wrap="wrap"
				gap="0.7rem"
			>

				{!user ? (
					<>

						<ApdNavLink to="/iniciarSesion">
							Iniciar sesión
						</ApdNavLink>

						<ApdNavLink to="/crearUsuario">
							Crear usuario
						</ApdNavLink>

					</>
				) : (
					<>

						<ApdNavLink
							to="/userPendingPostulations"
							variant="accent"
						>
							📝 Postulaciones ({pendingPostulations.length})
						</ApdNavLink>

						<ApdNavLink
							to="/userAccountSettings"
							variant="accent"
						>
							⚙️ Mi cuenta
						</ApdNavLink>

						{isAdmin && (
							<ApdNavLink
								to="/userAdminPanel"
								variant="accent"
							>
								🛠️ Admin Panel
							</ApdNavLink>
						)}

						<ApdNavLink
							to=""
							variant="danger"
							onClick={logout}
						>
							Cerrar sesión
						</ApdNavLink>

					</>
				)}

			</ApdLayoutStack>

		</ApdLayoutStack>

	);

}