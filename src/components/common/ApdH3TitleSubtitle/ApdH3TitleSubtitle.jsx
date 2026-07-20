import styles from "./ApdH3TitleSubtitle.module.css"

export default function ApdH3TitleSubtitle({ upper, lower }) {
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