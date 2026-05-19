import Encabezado3 from "./Encabezado3"
export default function OfertaCard({ offer }) {
	
	const estilo = {
		borderRadius: "15px",
		color: "black",
		border: "1px solid grey",
		padding: "4px",
		margin: "16px 124px",
		backgroundColor: "#79d4e0"
	}

	return (
		<div style={estilo}>
			<Encabezado3>{offer.cargo}</Encabezado3>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
			<button> Postularse</button>
		</div>
	)
}