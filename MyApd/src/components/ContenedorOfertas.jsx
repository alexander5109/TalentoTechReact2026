import TarjetaOferta from './TarjetaOferta'

export default function ContenedorOfertas(props) {
	return (
		<div>
			{props.ofertas.map(oferta => (
				<TarjetaOferta
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</div>
	)
}