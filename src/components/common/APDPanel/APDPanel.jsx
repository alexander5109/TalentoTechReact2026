
import styles from "./APDPanel.module.css";

export default function APDPanel({
	children
}) {
	return (
		<div className={styles.panel}>
			{children}
		</div>
	);
}