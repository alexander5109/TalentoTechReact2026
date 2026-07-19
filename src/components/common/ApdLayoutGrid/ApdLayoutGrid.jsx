import styles from "./ApdLayoutGrid.module.css";

export default function ApdLayoutGrid({
	as: Component = "div",
	children,

	columns = "repeat(auto-fit, minmax(220px, 1fr))",
	rows,
	gap = "1.2rem",

	columnGap,
	rowGap,

	align = "stretch",
	justify = "stretch",

	flex,
	shrink = 0,
	grow = 0,

	className = "",
	style = {},

	...props
}) {
	return (
		<Component
			className={`${styles.grid} ${className}`}
			style={{
				gridTemplateColumns: columns,
				gridTemplateRows: rows,

				gap,
				columnGap,
				rowGap,

				alignItems: align,
				justifyItems: justify,

				flex,
				flexGrow: grow,
				flexShrink: shrink,

				...style
			}}
			{...props}
		>
			{children}
		</Component>
	);
}