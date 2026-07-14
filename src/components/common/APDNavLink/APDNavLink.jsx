import { NavLink } from "react-router-dom";
import styles from "./APDNavLink.module.css";

export default function APDNavLink({
	to,
	children,
	variant,
	onClick
}) {

	function getClass(isActive) {

		const classes = [styles.link];

		if (variant == "logo" || variant == "danger") {
			classes.push(styles[variant]);
			return classes.join(" ");
		}

		if (variant) {
			classes.push(styles[variant]);
		}

		if (isActive) {
			classes.push(styles.active);
		}

		return classes.join(" ");
	}

	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={({ isActive }) => getClass(isActive)}
		>
			{children}
		</NavLink>
	);
}