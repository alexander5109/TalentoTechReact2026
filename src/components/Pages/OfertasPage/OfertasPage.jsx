import { useState } from "react"
import OfertaListContainer from "./OfertaListContainer/OfertaListContainer"
import FiltrosOfertas from "./FiltrosOfertas/FiltrosOfertas"
import styles from "./OfertasPage.module.css"

export default function OfertasPage() {
	const [filtros, setFiltros] = useState({
		cargos: [],
		distritos: [],
		estados: [],
		turnos: [],
		niveles: [],
	})

	return (
		<div className={styles.layout}>
			<nav className={styles.sidebar}>
				<FiltrosOfertas
					filtros={filtros}
					setFiltros={setFiltros}
				/>
			</nav>
			<section className={styles.content}>
				<OfertaListContainer
					filtros={filtros}
				/>
			</section>

		</div>
	)
}