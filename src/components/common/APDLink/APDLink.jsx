import { Link } from "react-router-dom";
import styles from "./APDLink.module.css";

export default function APDLink({
	to,
	children,
	variant = "primary",
	...props
}) {
	return (
		<Link
			to={to}
			className={`${styles.link} ${styles[variant]}`}
			{...props}
		>
			{children}
		</Link>
	);
}