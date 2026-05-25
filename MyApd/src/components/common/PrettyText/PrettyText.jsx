import styles from "./PrettyText.module.css"

export default function PrettyText({children}) {
	return (
		<p className={styles.text}>{children}</p>
	)
}