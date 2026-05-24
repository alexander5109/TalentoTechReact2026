import styles from "./PendingPostulationsWidget.module.css"

export default function PendingPostulationsWidget({ pendingCount }) {
	return (
		<h3 className={styles.pendingWidget}>📝({pendingCount})</h3>
	)
}