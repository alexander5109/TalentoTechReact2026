import { usePendingPostulations } from "../../../context/PendingPostulationsContext"

import OfertaCard from "../OfertasPage/OfertaCard/OfertaCard"

import SectionTitle from "../../common/SectionTitle/SectionTitle"
import TextContainer from "../../common/TextContainer/TextContainer"

import styles from "./PendingPostulationsPage.module.css"

import Swal from "sweetalert2"

export default function PendingPostulationsPage() {

	const {
		pendingPostulations,
		clearPendingPostulations
	} = usePendingPostulations()

	return (
		<TextContainer>
			<SectionTitle upper="Gestión de ofertas" lower="Postulaciones Pendientes" />
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
							<button className={`${styles.button} ${styles.primary}`}
								onClick={() => {
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
							</button>

						</div>

					</>

				)
			}
		</TextContainer>
	)
}