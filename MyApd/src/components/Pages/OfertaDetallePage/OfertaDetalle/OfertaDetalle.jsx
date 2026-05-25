import { Link } from "react-router-dom"
import SectionTitleH3 from "../../../common/SectionTitleH3/SectionTitleH3";

import Swal from "sweetalert2"

import {
	usePendingPostulations
} from "../../../../context/PendingPostulationsContext.jsx"

import styles from "./OfertaDetalle.module.css"

export default function OfertaDetalle({ offer }) {
	const estadoClase = (
		offer.estado === "Publicada"
			? styles.estadoPublicada
			: offer.estado === "Anulada"
				? styles.estadoAnulada
				: styles.estadoDesignada
	)
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
			title: "Oferta agregada",
			text:
				`${offer.cargo} agregada a postulaciones`,
			icon: "success",
			timer: 2500,
			showConfirmButton: false,
			toast: true,
			position: "top-end"
		})
	}

	function connectEliminarPostulacion() {

		removeFromPendingPostulations(
			offer.idoferta
		)

		Swal.fire({
			title: "Oferta eliminada",
			text: `${offer.cargo} eliminada`,
			icon: "info",
			timer: 2500,
			showConfirmButton: false,
			toast: true,
			position: "top-end"
		})
	}

	return (

		<div className={styles.container}>
			<div className={styles.header}>
				<SectionTitleH3
					upper={offer.cargo}
					lower={offer.descripcioncargo}
				/>
			</div>


			<div className={styles.detailsGrid}>

				<div>
					<strong>Escuela</strong>
					<p>{offer.escuela}</p>
				</div>

				<div>
					<strong>Curso</strong>
					<p>{offer.cursodivision}</p>
				</div>

				<div>
					<strong>Nivel</strong>
					<p>{offer.descnivelmodalidad}</p>
				</div>

				<div className={estadoClase}>
					<strong>Estado</strong>
					<p>{offer.estado}</p>
				</div>

				<div>
					<strong>Inicio oferta</strong>
					<p>{offer.iniciooferta}</p>
				</div>

				<div>
					<strong>Fin oferta</strong>
					<p>{offer.finoferta}</p>
				</div>

				<div>
					<strong>Toma de posesión</strong>
					<p>{offer.tomaposesion}</p>
				</div>

				<div>
					<strong>Suplencia desde</strong>
					<p>{offer.supl_desde}</p>
				</div>

				<div>
					<strong>Suplencia hasta</strong>
					<p>{offer.supl_hasta}</p>
				</div>

				<div>
					<strong>Reemplaza a</strong>
					<p>{offer.reemp_apeynom}</p>
				</div>

				<div>
					<strong>Motivo</strong>
					<p>{offer.reemp_motivo}</p>
				</div>
			</div>



			{
				offer.observaciones && (

					<div className={styles.section}>

						<h3>Observaciones</h3>

						<p>
							{offer.observaciones}
						</p>

					</div>
				)
			}


			<div className={styles.actions}>

				<Link
					to="/ofertas"
					className={
						`${styles.button}
						${styles.secondary}`
					}
				>
					Volver
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
							Quitar postulación
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
							Agregar postulación
						</button>

					)
				}

			</div>

		</div>
	)
}