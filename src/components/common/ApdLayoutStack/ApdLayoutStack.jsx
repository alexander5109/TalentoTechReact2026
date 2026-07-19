import styles from "./ApdLayoutStack.module.css";

export default function ApdLayoutStack({
	as: Component = "div",
	children,
	direction = "column",
	gap = "0.5rem",
	align = "stretch",
	justify = "flex-start",
	wrap = "nowrap",
	flex,
	shrink = 0,
	grow = 0,
	className = "",
	style = {},
	...props
}) {
	return (
		<Component
			className={`${styles.container} ${className}`}
			style={{
				flexDirection: direction,
				gap,
				alignItems: align,
				justifyContent: justify,
				flexWrap: wrap,
				flex,
				flexShrink: shrink,
				flexGrow: grow,
				...style,
			}}
			{...props}
		>
			{children}
		</Component>
	);
}