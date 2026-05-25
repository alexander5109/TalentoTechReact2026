import styles from "./PendingPostulationsWidget.module.css"

export default function PendingPostulationsWidget({ pendingCount }) {
	return (
		<h3 className={styles.pendingWidget}>📝 Mis postulaciones({pendingCount})</h3>
	)
}