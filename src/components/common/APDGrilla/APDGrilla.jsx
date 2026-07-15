import styles from "./APDGrilla.module.css";

export default function APDGrilla({
	children
}) {
	return (
		<div className={styles.grid}>
			{children}
		</div>
	)
}