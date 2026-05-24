import styles from './FiltrosOfertas.module.css'

export default function FiltrosOfertas({
	filtros,
	setFiltros
}) {
	function manejarCambio(evento) {
		const { name, value } = evento.target
		setFiltros({
			...filtros,
			[name]: value
		})
	}


	return (
		<form className={styles.form}>
			<h3 >Filtrar Ofertas</h3>
			<div className={styles.field}>
				<label>Cargo:</label>
				<input
					type="text"
					placeholder="Ej: Biologia"
					name="cargo"
					value={filtros.cargo}
					onChange={manejarCambio}
				/>
			</div>

			<div className={styles.field} >
				<label>Distrito:</label>
				<select name="distrito" value={filtros.distrito} onChange={manejarCambio} >
					<option value=""> Todos </option>
					<option value="LA MATANZA"> La Matanza </option>
					<option value="MORON"> Morón </option>
				</select>
			</div>

			<div className={styles.field} >
				<label>Turno:</label>
				<select name="turno" value={filtros.turno} onChange={manejarCambio}>
					<option value=""> Todos </option>
					<option value="M"> Mañana </option>
					<option value="T"> Tarde </option>
					<option value="V"> Vespertino </option>
				</select>
			</div>
		</form>
	)
}