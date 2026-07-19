import Swal from 'sweetalert2'
import { usePendingPostulations } from "../../../context/PendingPostulationsContext.jsx"
import styles from './ApdOfertaCard.module.css'
import ApdButton from '../ApdButton/ApdButton.jsx'
import ApdLink from '../ApdLink/ApdLink.jsx'
import ApdH4 from '../ApdH4/ApdH4.jsx'
import ApdH3 from '../ApdH3/ApdH3.jsx'
import ApdLayoutStack from '../ApdLayoutStack/ApdLayoutStack.jsx'

export default function ApdOfertaCard({ offer }) {
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

				<ApdH4>
					{offer.cargo}
				</ApdH4>

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

			<ApdLayoutStack direction="column">
				<ApdLink to={`/ofertas/${offer.idoferta}`}>
					Detalles
				</ApdLink>

				{
					isAgregada ? (
						<ApdButton variant="danger" onClick={connectEliminarPostulacion} >
							Quitar
						</ApdButton>
					) : (
						<ApdButton onClick={connectAgregarAPostulaciones}>
							Agregar
						</ApdButton>
					)
				}

			</ApdLayoutStack>

		</article >
	)
}