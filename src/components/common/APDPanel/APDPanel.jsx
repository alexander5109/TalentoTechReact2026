
import styles from "./ApdPanel.module.css";

export default function ApdPanel({
	children
}) {
	return (
		<div className={styles.panel}>
			{children}
		</div>
	);
}