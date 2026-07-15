import styles from "./APDForm.module.css";

export default function APDForm({
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