import { usePendingPostulations } from "../../../context/PendingPostulationsContext.jsx"
import Encabezado3 from "../../common/Encabezado3"
import styles from './OfertaCard.module.css'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function OfertaCard({ offer }) {
	const {
		pendingPostulations,
		addToPendingPostulations,
		removeFromPendingPostulations
	} = usePendingPostulations()
	const isAgregada = pendingPostulations.some(item => item.idoferta === offer.idoferta)
	function connectAgregarAPostulaciones() {
		addToPendingPostulations(offer)
		Swal.fire({
			title: 'Oferta agregada',
			text: `${offer.cargo} en escuela ${offer.escuela} fue agregada a postulaciones pendientes`,
			icon: 'success',
			timer: 3500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}
	function connectEliminarPostulacion() {
		removeFromPendingPostulations(offer.idoferta)
		Swal.fire({
			title: 'Oferta eliminada',
			text: `${offer.cargo} fue eliminada de postulaciones pendientes`,
			icon: 'info',
			timer: 3500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}
	const cargoImage = `/images/${offer.cargo.trim().split(" ")[0].toLowerCase()}.jpg`
	// console.log(cargoImage)
	return (

		<div className={styles.card}>
			<Encabezado3>{offer.cargo}</Encabezado3>
			<p>Escuela: {offer.escuela}</p>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
			<img
				src={cargoImage}
				onError={(e) => { e.target.src = "/images/docente.jpg" }}
				alt={offer.cargo} width="150" height="150">
			</img>
			<Link to={`/ofertas/${offer.idoferta}`} className={`${styles.button} ${styles.buttonSecondary}`} >
				Ver detalles...
			</Link>
			{
				isAgregada ? (
					<button className={`${styles.button} ${styles.buttonDanger}`} onClick={connectEliminarPostulacion} >
						Quitar de postulaciones
					</button>
				) : (
					<button className={`${styles.button} ${styles.buttonPrimary}`} onClick={connectAgregarAPostulaciones} >
						Agregar a postulaciones
					</button>
				)
			}

		</div>
	)
}