import styles from "./ApdForm.module.css";

export default function ApdForm({
	children,
	className = "",
	...props
}) {
	return (
		<form
			className={`${styles.form} ${className}`}
			{...props}
		>
			{children}
		</form>
	);
}