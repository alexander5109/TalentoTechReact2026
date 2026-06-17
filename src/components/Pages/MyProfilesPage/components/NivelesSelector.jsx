
export default function NivelesSelector(opciones, value, onChange) {
	return (
		<div className={styles.field}>
			<label className={styles.fieldTitle}>
				Niveles
			</label>
			<select value={value} onChange={e => onChange(e.target.value)} >
				<option value="">
					Seleccionar...
				</option>
				<div className={styles.checkboxGroup}> {
					opciones.map(option => (
						<option
							key={option}
							value={option}
						>
							{option}
						</option>
					))
				}
				</div>
			</select>
		</div>
	);
}