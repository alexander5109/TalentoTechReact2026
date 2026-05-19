import { useState } from 'react'
import Encabezado3 from "../Encabezado3"
import styles from './OfertaCard.module.css'
import Swal from 'sweetalert2'
export default function OfertaCard({ offer }) {
	const [agregada, setAgregada] = useState(false)
	function connectAgregarAPostulaciones() {
		setAgregada(true)
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
		setAgregada(false)
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
	return (
		<div className={styles.card}>
			<Encabezado3>{offer.cargo}</Encabezado3>
			<p>Escuela: {offer.escuela}</p>
			<p>Distrito: {offer.descdistrito}</p>
			<p>Turno: {offer.turno}</p>
			<p>Modulos: {offer.hsmodulos}</p>
			{
				agregada ? (
					<button
						className={`${styles.button} ${styles.buttonDanger}`}
						onClick={connectEliminarPostulacion}
					>
						Quitar de postulaciones
					</button>
				) : (
					<button
						className={`${styles.button} ${styles.buttonPrimary}`}
						onClick={connectAgregarAPostulaciones}
					>
						Agregar a postulaciones
					</button>
				)
			}

		</div>
	)
}