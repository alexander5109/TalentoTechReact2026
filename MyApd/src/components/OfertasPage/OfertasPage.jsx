import { useState } from "react"
import OfertaListContainer from "./OfertaListContainer/OfertaListContainer"
import FiltrosOfertas from "./FiltrosOfertas/FiltrosOfertas"

export default function OfertasPage() {
	const [filtros, setFiltros] = useState({
		cargo: '',
		distrito: '',
		turno: ''
	})
	return (
		<>
			<FiltrosOfertas
				filtros={filtros}
				setFiltros={setFiltros}
			/>
			<OfertaListContainer
				filtros={filtros}
			/>
		</>
	)
}
