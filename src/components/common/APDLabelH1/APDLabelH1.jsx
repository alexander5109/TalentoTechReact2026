import styles from "./APDLabelH1.module.css"

export default function APDLabelH1({ upper, lower }) {
	return (
		<h1 className={styles.sectionHeading}>
			<span className={styles.upper}>
				{upper}
			</span>

			<span className={styles.lower}>
				{lower}
			</span>
		</h1>
	)
}