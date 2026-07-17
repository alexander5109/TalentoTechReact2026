import { Link } from "react-router-dom";
import styles from "./ApdLink.module.css";

export default function ApdLink({
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