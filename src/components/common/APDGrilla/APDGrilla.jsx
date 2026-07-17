import styles from "./ApdGrilla.module.css";

export default function ApdGrilla({
	children
}) {
	return (
		<div className={styles.grid}>
			{children}
		</div>
	)
}