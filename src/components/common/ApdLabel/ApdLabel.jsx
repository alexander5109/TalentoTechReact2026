import styles from "./ApdLabel.module.css";

export default function ApdLabel({
	children,
	className = "",
	style,
	...props
}) {
	return (
		<label
			className={`${styles.label} ${className}`}
			style={style}
			{...props}
		>
			{children}
		</label>
	);
}