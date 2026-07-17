import styles from "./ApdLabelH3.module.css"

export default function ApdLabelH3({ upper, lower }) {
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