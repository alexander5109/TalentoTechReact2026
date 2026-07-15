import { usePendingPostulations } from "../../../context/PendingPostulationsContext"

import OfertaCard from "../OfertasPage/OfertaCard/OfertaCard"

import APDLabelH1 from "../../common/APDLabelH1/APDLabelH1"
import APDSection from "../../common/APDSection/APDSection"

import styles from "./UserPendingPostulationsPage.module.css"

import Swal from "sweetalert2"
import APDButton from "../../common/APDButton/APDButton"

export default function UserPendingPostulationsPage() {

	const {
		pendingPostulations,
		clearPendingPostulations
	} = usePendingPostulations()

	return (
		<APDSection>
			<APDLabelH1 upper="Gestión de ofertas" lower="Postulaciones Pendientes" />
			{
				pendingPostulations.length === 0 ? (
					<p className={styles.empty}>
						No hay ofertas agregadas.
					</p>
				) : (
					<>
						<div className={styles.list}>
							{
								pendingPostulations.map((offer) => (
									<OfertaCard
										key={offer.idoferta}
										offer={offer}
									/>
								))
							}

						</div>
						<div className={styles.checkoutBox}>
							<p>
								Total de postulaciones:
								{" "}
								<strong>
									{pendingPostulations.length}
								</strong>
							</p>
							<APDButton onClick={() => {
								Swal.fire({
									title: "Exito",
									text: `Postulaciones enviadas`,
									icon: "success",
									timer: 1000,
									showConfirmButton: false,
									toast: true,
									position: "center"
								})
								clearPendingPostulations()
							}}
							>
								Confirmar postulaciones
							</APDButton>

						</div>

					</>

				)
			}
		</APDSection>
	)
}