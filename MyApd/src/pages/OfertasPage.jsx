import { useState } from "react"
import OfertaListContainer from "../components/OfertaListContainer/OfertaListContainer"
// import FiltrosOfertas from "../components/FiltrosOfertas/FiltrosOfertas"

export default function OfertasPage() {
	const [filtros, setFiltros] = useState({
		cargo: '',
		distrito: '',
		turno: ''
	})
	return (
		<>
			{/* <FiltrosOfertas
				filtros={filtros}
				setFiltros={setFiltros}
			/> */}
			<OfertaListContainer
				filtros={filtros}
			/>
		</>
	)
}
