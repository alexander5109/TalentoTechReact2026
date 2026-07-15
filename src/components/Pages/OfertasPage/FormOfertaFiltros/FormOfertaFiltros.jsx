import styles from './FormOfertaFiltros.module.css'
import RadioFilterGroup from './RadioFilterGroup/RadioFilterGroup';

import APDForm from '../../../common/APDForm/APDForm';
import APDFormField from '../../../common/APDFormField/APDFormField';
import APDInput from '../../../common/APDInput/APDInput';

export default function FormOfertaFiltros({
	filtros,
	setFiltros
}) {
	function manejarCambio(evento) {
		const { name, value } = evento.target
		setFiltros({
			...filtros,
			[name]: value
		})
		// console.log("cambia o no cambia?")
		// console.log(filtros)
	}
	return <APDForm>
		<h3>Filtrar Ofertas</h3>
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

		<APDFormField
			label="Cargo"
			htmlFor="cargo"
		>
			<APDInput
				id="cargo"
				name="cargo"
				type="text"
				placeholder="Ej: Biología"
				value={filtros.cargo}
				onChange={manejarCambio}
			/>
		</APDFormField>

		<APDFormField
			label="Distrito"
			htmlFor="distrito"
		>
			<select
				id="distrito"
				name="distrito"
				value={filtros.distrito}
				onChange={manejarCambio}
			>
				<option value="">Todos</option>
				<option value="LA MATANZA">La Matanza</option>
				<option value="MORON">Morón</option>
			</select>
		</APDFormField>

		<RadioFilterGroup
			label="Turno"
			name="turno"
			value={filtros.turno}
			onChange={manejarCambio}
			options={[
				{
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

	</APDForm>
}