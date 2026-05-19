import OfertaList from './OfertaList'
import ofertas from "../data/ofertas.json"

export default function OfertaListContainer({ mensaje }) {
	return (
		<div>
			<h2>mensaje</h2>
			<div>
				<OfertaList items={ofertas}></OfertaList>
			</div>
		</div>
	)
}