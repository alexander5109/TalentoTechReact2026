import styles from "./ApdH1TitleSubtitle.module.css"

export default function ApdH1TitleSubtitle({ upper, lower }) {
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