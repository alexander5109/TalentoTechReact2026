import styles from "./ApdLayoutStack.module.css";

export default function ApdLayoutStack({
	as: Component = "div",
	children,
	padding = "0",
	margin = "1rem",
	direction = "column",
	gap = "0.5rem",
	align = "stretch",
	justify = "flex-start",
	wrap = "nowrap",
	flex,
	className = "",
	style = {},
	...props
}) {
	return (
		<Component
			className={`${styles.container} ${className}`}
			style={{
				flexDirection: direction,
				padding,
				margin,
				gap,
				alignItems: align,
				justifyContent: justify,
				flexWrap: wrap,
				flex,
				...style,
			}}
			{...props}
		>
			{children}
		</Component>
	);
}