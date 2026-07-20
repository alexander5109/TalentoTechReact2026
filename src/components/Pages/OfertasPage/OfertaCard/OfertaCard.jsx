import Swal from 'sweetalert2'
import { usePendingPostulations } from "./../../../../context/PendingPostulationsContext.jsx"
import styles from './OfertaCard.module.css'
import ApdButton from '../../../common/ApdButton/ApdButton.jsx'
import ApdLink from '../../../common/ApdLink/ApdLink.jsx'
import ApdH4 from '../../../common/ApdH4/ApdH4.jsx'
import ApdH3 from '../../../common/ApdH3/ApdH3.jsx'
import ApdLayoutStack from '../../../common/ApdLayoutStack/ApdLayoutStack.jsx'
import ApdLayoutGrid from '../../../common/ApdLayoutGrid/ApdLayoutGrid.jsx'
import ApdChip from '../../../common/ApdChip/ApdChip.jsx'

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




	return <ApdLayoutStack as="article" className={styles.card} justify="center">

		<ApdH4 style={{ textAlign: "center" }}>
			{offer.cargo}
		</ApdH4>

		<img
			src={cargoImage}
			onError={(e) => {
				e.target.src = "/images/docente.jpg";
			}}
			alt={offer.cargo}
			className={styles.image}
		/>

		<ApdLayoutGrid
			columns="repeat(auto-fit, minmax(120px, max-content))"
			columnGap="0.5rem"
			rowGap="0.5rem"
		>

			<ApdChip className={estadoClase}>
				{offer.estado}
			</ApdChip>

			<ApdChip>
				{offer.descdistrito}
			</ApdChip>

			<ApdChip>
				Turno {offer.turno}
			</ApdChip>

			<ApdChip>
				{offer.hsmodulos} módulos
			</ApdChip>


		</ApdLayoutGrid>

		<ApdLayoutStack direction="row" justify="center" gap="0.5rem">
			<ApdLink to={`/ofertas/${offer.idoferta}`}>
				Detalles
			</ApdLink>

			{isAgregada ? (
				<ApdButton
					variant="danger"
					onClick={connectEliminarPostulacion}
				>
					Quitar
				</ApdButton>
			) : (
				<ApdButton
					onClick={connectAgregarAPostulaciones}
				>
					Agregar
				</ApdButton>
			)}

		</ApdLayoutStack>

	</ApdLayoutStack>
}