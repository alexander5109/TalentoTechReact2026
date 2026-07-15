import { useState } from "react"
import OfertaListContainer from "./OfertaListContainer/OfertaListContainer"
import FormOfertaFiltros from "./FormOfertaFiltros/FormOfertaFiltros"
import styles from "./OfertasPage.module.css"
import APDSection from '../../common/APDSection/APDSection';


export default function OfertasPage() {
	const [filtros, setFiltros] = useState({
		cargo: '',
		distrito: '',
		turno: '',
		estado: ''
	})

	return (
		<div className={styles.layout}>
			<APDSection>
				<aside className={styles.sidebar}>
					<FormOfertaFiltros
						filtros={filtros}
						setFiltros={setFiltros}
					/>
				</aside>
			</APDSection>
			<section className={styles.content}>
				<OfertaListContainer
					filtros={filtros}
				/>
			</section>

		</div>
	)
}