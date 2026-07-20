import styles from "./ApdSpinner.module.css";

export default function ApdSpinner() {
	return (
		<div className={styles.container}>
			<div className={styles.spinner}></div>
		</div>
	);
}