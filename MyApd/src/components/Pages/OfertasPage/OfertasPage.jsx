import { useState } from "react"
import OfertaListContainer from "./OfertaListContainer/OfertaListContainer"
import FiltrosOfertas from "./FiltrosOfertas/FiltrosOfertas"
import styles from "./OfertasPage.module.css"

export default function OfertasPage() {
	const [filtros, setFiltros] = useState({
		cargo: '',
		distrito: '',
		turno: ''
	})

	return (
		<div className={styles.layout}>
			<aside className={styles.sidebar}>
				<FiltrosOfertas
					filtros={filtros}
					setFiltros={setFiltros}
				/>
			</aside>
			<section className={styles.content}>
				<OfertaListContainer
					filtros={filtros}
				/>
			</section>

		</div>
	)
}