import styles from "./APDDetailHeader.module.css";

export default function APDDetailHeader({ children }) {

	return (
		<div className={styles.header}>
			<strong>{children}</strong>
		</div>
	);

}