import styles from "./ApdButton.module.css";

export default function ApdButton({
	children,
	variant = "primary",
	type = "button",
	...props
}) {
	return <button
		type={type}
		className={`${styles.button} ${styles[variant]}`}
		{...props}
	>
		{children}
	</button>
}