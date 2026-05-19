import styles from "./Footer.module.css"

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>© 2026 - Buscador de APD</p>

			<p className={styles.author}>
				Desarrollado por Seling Alexander
			</p>
		</footer>
	)
}