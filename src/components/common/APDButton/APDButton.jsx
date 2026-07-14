import styles from "./APDButton.module.css";

export default function APDButton({
	children,
	variant = "primary",
	type = "button",
	...props
}) {
	return (
		<button
			type={type}
			className={`${styles.button} ${styles[variant]}`}
			{...props}
		>
			{children}
		</button>
	);
}