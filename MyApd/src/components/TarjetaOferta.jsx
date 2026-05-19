export default function OfferCard({ offer }) {
	
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
			<h3>{offer.cargo}</h3>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
		</div>
	)
}