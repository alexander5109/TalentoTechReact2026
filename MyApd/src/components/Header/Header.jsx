import styles from "./Header.module.css"

export default function Header() {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>
				Buscador de Actos Públicos Digitales
			</h1>

			<p className={styles.subtitle}>
				Ofertas docentes de la Provincia de Buenos Aires
			</p>
		</header>
	)
}