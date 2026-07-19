import styles from "./ApdPanel.module.css";

export default function ApdPanel({
	as: Component = "section",
	children,
	image = null,
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
	const imageRight = image?.side === "right";

	return (
		<Component
			className={`
				${styles.surface}
				${image ? styles.container : ""}
				${imageRight ? styles.reverse : ""}
				${className}
			`}
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

			{image && (
				<div className={styles.imageContainer}>
					<img
						src={image.src}
						alt={image.alt ?? ""}
						className={styles.image}
					/>
				</div>
			)}

			<div className={styles.content}>
				{children}
			</div>

		</Component>
	);
}