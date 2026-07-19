import { usePendingPostulations } from "../../../context/PendingPostulationsContext"

import ApdOfertaCard from '../../common/ApdOfertaCard/ApdOfertaCard'

import ApdH1TitleSubtitle from "../../common/ApdH1TitleSubtitle/ApdH1TitleSubtitle"
import ApdPanel from "../../common/ApdPanel/ApdPanel"

import styles from "./UserPendingPostulationsPage.module.css"

import Swal from "sweetalert2"
import ApdButton from "../../common/ApdButton/ApdButton"

export default function UserPendingPostulationsPage() {

	const {
		pendingPostulations,
		clearPendingPostulations
	} = usePendingPostulations()

	return <ApdPanel as="section">
		<ApdH1TitleSubtitle upper="Gestión de ofertas" lower="Postulaciones Pendientes" />
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
	</ApdPanel>
}