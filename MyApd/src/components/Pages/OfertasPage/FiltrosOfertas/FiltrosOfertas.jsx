import styles from './FiltrosOfertas.module.css'
import RadioFilterGroup from './RadioFilterGroup/RadioFilterGroup'

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
			<RadioFilterGroup
				label="Estado"
				name="estado"
				value={filtros.estado}
				onChange={manejarCambio}
				options={[
					{
						label: "Todos",
						value: ""
					},
					{
						label: "Publicada",
						value: "Publicada",
						className: styles.publicada
					},
					{
						label: "Anulada",
						value: "Anulada",
						className: styles.anulada
					},
					{
						label: "Designada",
						value: "Designada",
						className: styles.designada
					}
				]}
			/>


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



			<RadioFilterGroup
				label="Turno"
				name="turno"
				value={filtros.turno}
				onChange={manejarCambio}
				options={[{
					label: "Todos",
					value: ""
				},
				{
					label: "Mañana",
					value: "M"
				},
				{
					label: "Tarde",
					value: "T"
				},
				{
					label: "Vespertino",
					value: "V"
				}
				]}
			/>
		</form>
	)
}