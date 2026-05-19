import OfertaCard from './OfertaCard'

export default function OfertaList({items}) {
	return (
		<div>
			{items.map(oferta => (
				<OfertaCard
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</div>
	)
}