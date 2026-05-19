import OfertaList from './OfertaList'
import ofertas from "../data/ofertas.json"
import Encabezado1 from './Encabezado1'

export default function OfertaListContainer({ mensaje }) {
	const estilo = {
		margin: "15px",
	};
	return (
		<div style={estilo}>
			<Encabezado1>{mensaje}</Encabezado1>
			<div>
				<OfertaList items={ofertas}></OfertaList>
			</div>
		</div>
	)
}