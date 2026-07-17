import styles from "./ApdDetailHeader.module.css";

export default function ApdDetailHeader({ children }) {

	return (
		<div className={styles.header}>
			<strong>{children}</strong>
		</div>
	);

}