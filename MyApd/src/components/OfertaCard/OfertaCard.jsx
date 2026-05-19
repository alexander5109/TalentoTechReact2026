import Encabezado3 from "../Encabezado3"
import styles from './OfertaCard.module.css'
import Swal from 'sweetalert2'


export default function OfertaCard({ offer }) {
	function connectAgregarAPostulaciones() {
		Swal.fire({
			title: 'Agregada',
			text: 'La oferta fue agregada a postulaciones pendientes',
			icon: 'success',
			confirmButtonText: 'Aceptar'
		})
	}

	return (
		<div className={styles.card}>
			<Encabezado3>{offer.cargo}</Encabezado3>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
			<button onClick={connectAgregarAPostulaciones}> Agregar a postulaciones</button>
		</div>
	)
}