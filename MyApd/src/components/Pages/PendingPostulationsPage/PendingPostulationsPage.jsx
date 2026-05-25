import { usePendingPostulations } from "../../../context/PendingPostulationsContext"
import styles from "./PendingPostulationsPage.module.css"

export default function PendingPostulationsPage() {
	const {
		pendingPostulations,
		removeFromPendingPostulations,
		clearPendingPostulations
	} = usePendingPostulations()
	return (
		<div className={styles.container}>
			<h1> Postulaciones pendientes </h1> {
				pendingPostulations.length === 0 ? (<p> No hay ofertas agregadas. </p>) : (
					<> <div className={styles.list}> {
						pendingPostulations.map((offer) => (
							<div key={offer.idoferta} className={styles.card} >
								<h3>{offer.cargo}</h3>
								<p>Escuela: {offer.escuela}</p>
								<p>Distrito: {offer.descdistrito}</p>
								<p> Turno: {offer.turno} </p>
								<p> Módulos: {offer.hsmodulos} </p>
								<button
									className={`${styles.button} ${styles.buttonDanger}`}
									onClick={() =>
										removeFromPendingPostulations(
											offer.idoferta
										)
									} > Quitar </button>
							</div>
						))
					} </div>
						<div className={styles.checkoutBox}>
							<p> Total de postulaciones: {" "} <strong> {pendingPostulations.length} </strong> </p>
							<button
								className={`${styles.button} ${styles.buttonPrimary}`}
								onClick={() => {
									alert("Postulaciones enviadas")
									clearPendingPostulations()
								}}
							> Confirmar postulaciones </button>
						</div>
					</>
				)
			}
		</div>
	)
}