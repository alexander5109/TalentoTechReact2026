import APDLabelH3 from "../../../common/APDLabelH3/APDLabelH3";

import Swal from "sweetalert2"

import {
	usePendingPostulations
} from "../../../../context/PendingPostulationsContext.jsx"

import styles from "./OfertaDetalle.module.css"
import APDLink from "../../../common/APDLink/APDLink.jsx";
import APDButton from "../../../common/APDButton/APDButton.jsx";
import APDDetailItem from "../../../common/APDDetailItem/APDDetailItem.jsx";
import APDDetailHeader from "../../../common/APDDetailHeader/APDDetailHeader.jsx";
import APDGrilla from "../../../common/APDGrilla/APDGrilla.jsx";
import ApdPrettyP from "../../../common/ApdPrettyP/ApdPrettyP.jsx";

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
				<APDLabelH3
					upper={offer.cargo}
					lower={offer.descripcioncargo}
				/>
				< img
					src={cargoImage}
					onError={
						(e) => { e.target.src = "/images/docente.jpg" }
					}
					alt={offer.cargo}
					className={styles.image}
				/>
			</div>
			<APDGrilla>
				{detalles.map(([header, value, variantClassName]) => (
					<APDDetailItem
						key={header}
						variantClassName={variantClassName}
					>
						<APDDetailHeader>{header}</APDDetailHeader>
						<ApdPrettyP>{value}</ApdPrettyP>
					</APDDetailItem>
				))}
			</APDGrilla>


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

				<APDLink to="/ofertas" >
					Volver
				</APDLink>

				{
					isAgregada ? (

						<APDButton variant="danger" onClick={connectEliminarPostulacion}>
							Quitar postulación
						</APDButton>

					) : (

						<APDButton onClick={connectAgregarAPostulaciones} >
							Agregar postulación
						</APDButton>

					)
				}

			</div>

		</div >
	)
}