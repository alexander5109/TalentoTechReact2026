import styles from "./SectionTitle.module.css"

export default function SectionTitle({ upper, lower }) {
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