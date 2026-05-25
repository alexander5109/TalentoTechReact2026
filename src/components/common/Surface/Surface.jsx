import styles from "./Surface.module.css"

export default function Surface({
	children,
	className = ""
}) {
	return (
		<div className={`${styles.surface} ${className}`}>
			{children}
		</div>
	)
}