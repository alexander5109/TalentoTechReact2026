import ApdH3TitleSubtitle from "./../../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import Swal from "sweetalert2"
import { usePendingPostulations } from "./../../../../context/PendingPostulationsContext.jsx"
import styles from "./OfertaDetalle.module.css"
import ApdLink from "./../../../common/ApdLink/ApdLink.jsx";
import ApdButton from "./../../../common/ApdButton/ApdButton.jsx";
import ApdDetailItem from "./../../../common/ApdDetailItem/ApdDetailItem.jsx";
import ApdLayoutGrid from "./../../../common/ApdLayoutGrid/ApdLayoutGrid.jsx";
import ApdPrettyP from "./../../../common/ApdPrettyP/ApdPrettyP.jsx";
import ApdH3 from "./../../../common/ApdH3/ApdH3.jsx";
import ApdH4 from "./../../../common/ApdH4/ApdH4.jsx";
import ApdLayoutStack from "./../../../common/ApdLayoutStack/ApdLayoutStack.jsx";
import ApdPanel from "../../../common/ApdPanel/ApdPanel.jsx";
import { useAuth } from "../../../../context/AuthContext.jsx";

export default function OfertaDetalle({ offer }) {

	const { hasFeature } = useAuth();


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
		["Observaciones", offer.observaciones ?? "-"],
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

	return <ApdPanel>
		<div className={styles.header}>
			<ApdH3TitleSubtitle upper={offer.cargo} lower={offer.descripcioncargo} />
			< img
				src={cargoImage}
				onError={
					(e) => { e.target.src = "/images/docente.jpg" }
				}
				alt={offer.cargo}
				className={styles.image}
			/>
		</div>


		{hasFeature("school_map")
			? (
				<ApdPanel>
					<ApdH4>📍 Ubicación aproximada:</ApdH4>

					<iframe
						className={styles.map}
						src="https://maps.google.com/maps?q=Obelisco%20Buenos%20Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
						width="100%"
						height="300"
					></iframe>
				</ApdPanel>
			)
			: (
				<ApdPanel className={styles.backgroundDanger}>
					<ApdH4>📍 Ubicación aproximada:</ApdH4>

					<ApdPrettyP>
						Necesitas activar la feature con un código de promoción.
					</ApdPrettyP>
				</ApdPanel>
			)
		}
		<ApdLayoutGrid>
			{detalles.map(([header, value, variantClassName]) => (
				<ApdDetailItem key={header} variantClassName={variantClassName}>
					<ApdH4>{header}</ApdH4>
					<ApdPrettyP>{value}</ApdPrettyP>
				</ApdDetailItem>
			))}

		</ApdLayoutGrid>



		<ApdLayoutStack>

			<ApdLink variant="secondary" to="/ofertas" >
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

		</ApdLayoutStack>

	</ApdPanel >
}