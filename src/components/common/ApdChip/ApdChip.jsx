import styles from "./ApdChip.module.css";

export default function ApdChip({
	as: Component = "span",
	children,
	className = "",
	style = {},
	...props
}) {
	return (
		<Component
			className={`${styles.chip} ${className}`}
			style={style}
			{...props}
		>
			{children}
		</Component>
	);
}