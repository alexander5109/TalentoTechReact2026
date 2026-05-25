import styles from './OfertaDetalle.module.css'

export default function OfertaDetalle({ offer }) {

	return (
		<div className={styles.container}>
			<h1>{offer.cargo}</h1>
			<h3>{offer.descripcioncargo}</h3>
			<hr />

			<p>
				<strong>Distrito:</strong>
				{offer.descdistrito}
			</p>

			<p>
				<strong>Escuela:</strong>
				{offer.escuela}
			</p>

			<p>
				<strong>Turno:</strong>
				{offer.turno}
			</p>

			<p>
				<strong>Módulos:</strong>
				{offer.hsmodulos}
			</p>

			<p>
				<strong>Curso:</strong>
				{offer.cursodivision}
			</p>

			<p>
				<strong>Nivel:</strong>
				{offer.descnivelmodalidad}
			</p>

			<p>
				<strong>Estado:</strong>
				{offer.estado}
			</p>

			<p>
				<strong>Inicio oferta:</strong>
				{offer.iniciooferta}
			</p>

			<p>
				<strong>Fin oferta:</strong>
				{offer.finoferta}
			</p>

			<p>
				<strong>Toma de posesión:</strong>
				{offer.tomaposesion}
			</p>

			<p>
				<strong>Suplencia desde:</strong>
				{offer.supl_desde}
			</p>

			<p>
				<strong>Suplencia hasta:</strong>
				{offer.supl_hasta}
			</p>

			<p>
				<strong>Reemplaza a:</strong>
				{offer.reemp_apeynom}
			</p>

			<p>
				<strong>Motivo:</strong>
				{offer.reemp_motivo}
			</p>

			{
				offer.observaciones && (
					<p>
						<strong>Observaciones:</strong>
						{offer.observaciones}
					</p>
				)
			}

		</div>
	)
}