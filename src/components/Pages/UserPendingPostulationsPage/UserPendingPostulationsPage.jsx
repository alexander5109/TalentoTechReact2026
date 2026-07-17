import { usePendingPostulations } from "../../../context/PendingPostulationsContext"

import ApdOfertaCard from '../../common/ApdOfertaCard/ApdOfertaCard'

import ApdLabelH1 from "../../common/ApdLabelH1/ApdLabelH1"
import ApdSection from "../../common/ApdSection/ApdSection"

import styles from "./UserPendingPostulationsPage.module.css"

import Swal from "sweetalert2"
import ApdButton from "../../common/ApdButton/ApdButton"

export default function UserPendingPostulationsPage() {

	const {
		pendingPostulations,
		clearPendingPostulations
	} = usePendingPostulations()

	return (
		<ApdSection>
			<ApdLabelH1 upper="Gestión de ofertas" lower="Postulaciones Pendientes" />
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
									<ApdOfertaCard
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
							<ApdButton onClick={() => {
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
							</ApdButton>

						</div>

					</>

				)
			}
		</ApdSection>
	)
}