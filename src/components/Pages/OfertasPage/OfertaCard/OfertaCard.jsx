import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { usePendingPostulations } from "../../../../context/PendingPostulationsContext.jsx"
import styles from './OfertaCard.module.css'

export default function OfertaCard({ offer }) {
	const estadoClase = (
		offer.estado === "Publicada"
			? styles.estadoPublicada
			: offer.estado === "Anulada"
				? styles.estadoAnulada
				: styles.estadoDesignada
	)
	// console.log("estadoClase")
	// console.log(estadoClase)

	const {
		pendingPostulations,
		addToPendingPostulations,
		removeFromPendingPostulations
	} = usePendingPostulations()

	const isAgregada =
		pendingPostulations.some(
			item => item.idoferta === offer.idoferta
		)

	function connectAgregarAPostulaciones() {

		addToPendingPostulations(offer)

		Swal.fire({
			title: 'Oferta agregada',
			text:
				`${offer.cargo} agregada a postulaciones`,
			icon: 'success',
			timer: 2500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}

	function connectEliminarPostulacion() {

		removeFromPendingPostulations(
			offer.idoferta
		)

		Swal.fire({
			title: 'Oferta eliminada',
			text:
				`${offer.cargo} eliminada`,
			icon: 'info',
			timer: 2500,
			showConfirmButton: false,
			toast: true,
			position: 'top-end'
		})
	}

	const cargoImage =
		`/images/${offer.cargo
			.trim()
			.split(" ")[0]
			.toLowerCase()
		}.jpg`

	return (

		<article className={styles.card}>

			<img
				src={cargoImage}
				onError={(e) => {
					e.target.src =
						"/images/docente.jpg"
				}}
				alt={offer.cargo}
				className={styles.image}
			/>

			<div className={styles.mainInfo}>

				<h3>
					{offer.cargo}
				</h3>

				<div className={styles.meta}>
					<span className={estadoClase}>
						{offer.estado}
					</span>

					<span>
						{offer.descdistrito}
					</span>

					<span>
						Turno {offer.turno}
					</span>

					<span>
						{offer.hsmodulos} módulos
					</span>
				</div>

			</div>

			<div className={styles.actions}>

				<Link
					to={`/ofertas/${offer.idoferta}`}
					className={
						`${styles.button}
						${styles.secondary}`
					}
				>
					Detalles
				</Link>

				{
					isAgregada ? (
						<button
							className={
								`${styles.button}
								${styles.danger}`
							}
							onClick={
								connectEliminarPostulacion
							}
						>
							Quitar
						</button>
					) : (
						<button
							className={
								`${styles.button}
								${styles.primary}`
							}
							onClick={
								connectAgregarAPostulaciones
							}
						>
							Agregar
						</button>
					)
				}

			</div>

		</article>
	)
}