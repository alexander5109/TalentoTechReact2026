import ApdLabelH3 from "../../../common/ApdLabelH3/ApdLabelH3";

import Swal from "sweetalert2"

import {
	usePendingPostulations
} from "../../../../context/PendingPostulationsContext.jsx"

import styles from "./OfertaDetalle.module.css"
import ApdLink from "../../../common/ApdLink/ApdLink.jsx";
import ApdButton from "../../../common/ApdButton/ApdButton.jsx";
import ApdDetailItem from "../../../common/ApdDetailItem/ApdDetailItem.jsx";
import ApdDetailHeader from "../../../common/ApdDetailHeader/ApdDetailHeader.jsx";
import ApdGrilla from "../../../common/ApdGrilla/ApdGrilla.jsx";
import ApdPrettyP from "../../../common/ApdPrettyP/ApdPrettyP.jsx";
import ApdH3 from "../../../common/ApdH3/ApdH3.jsx";

export default function OfertaDetalle({ offer }) {

	const backgroundClassEstado = (
		offer.estado === "Publicada"
			? styles.backgroundPrimary
			: offer.estado === "Anulada"
				? styles.backgroundDanger
				: styles.backgroundSecondary
	)

	const detalles = [
		["Escuela", offer.escuela],
		["Estado", offer.estado, backgroundClassEstado],
		["Curso", offer.cursodivision],
		["Nivel", offer.descnivelmodalidad],
		["Inicio oferta", offer.iniciooferta],
		["Fin oferta", offer.finoferta],
		["Toma de posesión", offer.tomaposesion],
		["Suplencia desde", offer.supl_desde],
		["Suplencia hasta", offer.supl_hasta],
		["Reemplaza a", offer.reemp_apeynom ?? "-"],
		["Motivo", offer.reemp_motivo ?? "-"],
	];

	const cargoImage = `/images/${offer.cargo
		.trim()
		.split(" ")[0]
		.toLowerCase()
		}.jpg`


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
				<ApdLabelH3 upper={offer.cargo} lower={offer.descripcioncargo} />
				< img
					src={cargoImage}
					onError={
						(e) => { e.target.src = "/images/docente.jpg" }
					}
					alt={offer.cargo}
					className={styles.image}
				/>
			</div>
			<ApdGrilla>
				{detalles.map(([header, value, variantClassName]) => (
					<ApdDetailItem
						key={header}
						variantClassName={variantClassName}
					>
						<ApdDetailHeader>{header}</ApdDetailHeader>
						<ApdPrettyP>{value}</ApdPrettyP>
					</ApdDetailItem>
				))}
			</ApdGrilla>


			{
				offer.observaciones && (

					<div className={styles.section}>

						<ApdH3>Observaciones</ApdH3>

						<p>
							{offer.observaciones}
						</p>

					</div>
				)
			}


			<div className={styles.actionsContainer}>

				<ApdLink to="/ofertas" >
					Volver
				</ApdLink>

				{
					isAgregada ? (

						<ApdButton variant="danger" onClick={connectEliminarPostulacion}>
							Quitar postulación
						</ApdButton>

					) : (

						<ApdButton onClick={connectAgregarAPostulaciones} >
							Agregar postulación
						</ApdButton>

					)
				}

			</div>

		</div >
	)
}