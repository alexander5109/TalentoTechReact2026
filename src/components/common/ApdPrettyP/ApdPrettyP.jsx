import styles from "./ApdPrettyP.module.css"

export default function ApdPrettyP({ children }) {
	return (
		<p className={styles.text}>{children}</p>
	)
}