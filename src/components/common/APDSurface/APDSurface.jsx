import styles from "./APDSurface.module.css"

export default function APDSurface({
	children,
	className = ""
}) {
	return (
		<div className={`${styles.surface} ${className}`}>
			{children}
		</div>
	)
}