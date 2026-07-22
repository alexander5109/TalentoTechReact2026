import styles from "./Footer.module.css"
import EmpresaMemberTarjeta from "../common/EmpresaMemberTarjeta/EmpresaMemberTarjeta"

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<h3>Apd Finder</h3>
			<p>
				Sistema de búsqueda de Actos Públicos Digitales
			</p>
			<div className={styles.team}>
				<EmpresaMemberTarjeta
					nombre="Alexander Seling"
					rol="Desarrollador"
					imagen="/images/desarrollador.jpg"
				/>

				<EmpresaMemberTarjeta
					nombre="Alfonsina Yelmar Gonzalez"
					rol="Profesora"
					imagen="/images/docente.jpg"
				/>

				<EmpresaMemberTarjeta
					nombre="Ricardo Hermes Trismegistus Beckenbauer"
					rol="Bibliotecario"
					imagen="/images/bibliotecario.jpg"
				/>
			</div>

			<p className={styles.author}>
				Desarrollado por Seling Alexander
			</p>

		</footer>
	)
}