
import styles from "./PageSection.module.css"

export default function PageSection({ children }) {
	return (
		<section className={styles.section}>
			{children}
		</section>
	)
}