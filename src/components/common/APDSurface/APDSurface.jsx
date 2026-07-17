import styles from "./ApdSurface.module.css"

export default function ApdSurface({
	children,
	className = ""
}) {
	return (
		<div className={`${styles.surface} ${className}`}>
			{children}
		</div>
	)
}