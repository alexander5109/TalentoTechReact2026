import styles from "./APDLabelH3.module.css"

export default function APDLabelH3({ upper, lower }) {
	return (
		<h3 className={styles.sectionHeading}>
			<span className={styles.upper}>
				{upper}
			</span>

			<span className={styles.lower}>
				{lower}
			</span>
		</h3>
	)
}