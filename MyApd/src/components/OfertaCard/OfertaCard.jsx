import Encabezado3 from "../Encabezado3"
import styles from './OfertaCard.module.css'

export default function OfertaCard({ offer }) {
	return (
		<div className={styles.card}>
			<Encabezado3>{offer.cargo}</Encabezado3>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
			<button> Postularse</button>
		</div>
	)
}