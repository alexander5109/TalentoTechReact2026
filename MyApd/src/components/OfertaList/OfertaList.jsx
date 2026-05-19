import OfertaCard from '../OfertaCard/OfertaCard'

export default function OfertaList({ofertas}) {
	
	const estilo = {
		display: "flex",
		gap: "20px",
	}

	return (
		<div style={estilo}>
			{ofertas.map(oferta => (
				<OfertaCard
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</div>
	)
}