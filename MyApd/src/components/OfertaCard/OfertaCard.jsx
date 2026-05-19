import Encabezado3 from "../Encabezado3"
import styles from './OfertaCard.module.css'
import Swal from 'sweetalert2'


export default function OfertaCard({ offer }) {
	function connectAgregarAPostulaciones() {
		Swal.fire({
			title: 'Oferta agregada',
			text: `${offer.cargo} en escuela ${offer.escuela} fue agregada a postulacionse pendientes`,
			icon: 'success',
			timer: 4500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}

	return (
		<div className={styles.card}>
			<Encabezado3>{offer.cargo}</Encabezado3>
			<p>Escuela: {offer.escuela}</p>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
			<button onClick={connectAgregarAPostulaciones}> Agregar a postulaciones</button>
		</div>
	)
}