import styles from "./NavBar.module.css";

import { usePendingPostulations } from "../../context/PendingPostulationsContext";
import { useAuth } from "../../context/AuthContext";

import ApdLayoutStack from "../common/ApdLayoutStack/ApdLayoutStack";
import ApdNavLink from "../common/ApdNavLink/ApdNavLink";

export default function NavBar() {

	const { user, logout } = useAuth();
	const { pendingPostulations } = usePendingPostulations();

	const isAdmin = user?.role === "admin";

	const publicLinks = [
		{ to: "/about", label: "About us" },
		{ to: "/contacto", label: "Contacto" },
		{ to: "/ofertas", label: "Ofertas" },
	];

	const guestLinks = [
		{ to: "/iniciarSesion", label: "Iniciar sesión" },
		{ to: "/crearUsuario", label: "Crear usuario" },
	];

	const userLinks = [
		{
			to: "/userPendingPostulations",
			label: `📝 Postulaciones (${pendingPostulations.length})`,
			variant: "accent",
		},
		{
			to: "/userAccountSettings",
			label: "⚙️ Mi cuenta",
			variant: "accent",
		},
		...(isAdmin
			? [{
				to: "/userAdminPanel",
				label: "🛠️ Admin Panel",
				variant: "accent",
			}]
			: []),
		{
			to: "",
			label: "Cerrar sesión",
			variant: "danger",
			onClick: logout,
		},
	];

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
				justify="center"
				align="center"
				wrap="wrap"
				gap="0.7rem"
			>
				{publicLinks.map(link => (
					<ApdNavLink
						key={link.to}
						to={link.to}
						variant={link.variant}
						onClick={link.onClick}
					>
						{link.label}
					</ApdNavLink>
				))}
			</ApdLayoutStack>

			<ApdLayoutStack
				direction="row"
				justify="center"
				align="center"
				wrap="wrap"
				gap="0.7rem"
			>
				{(user ? userLinks : guestLinks).map(link => (
					<ApdNavLink
						key={link.label}
						to={link.to}
						variant={link.variant}
						onClick={link.onClick}
					>
						{link.label}
					</ApdNavLink>
				))}
			</ApdLayoutStack>

		</ApdLayoutStack>
	);

}