import { Link } from "react-router-dom"
import styles from "./PendingPostulationsWidget.module.css"

export default function PendingPostulationsWidget() {

	const pendingCount = 3

	return (
		<Link
			to="/postulaciones"
			className={styles.pendingWidget}
		>
			Postulaciones ({pendingCount})
		</Link>
	)
}