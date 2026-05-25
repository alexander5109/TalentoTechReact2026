import styles from "./TextContainer.module.css"

export default function TextContainer({
	children
}) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	)
}