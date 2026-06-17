import styles from "../common.module.css"

export default function CargosSelector({
	opciones,
	selected,
	onChange
}) {

	function toggleCargo(cargo) {

		if (selected.includes(cargo)) {

			onChange(
				selected.filter(x => x !== cargo)
			);

			return;
		}

		onChange([
			...selected,
			cargo
		]);
	}

	return (
		<div className={styles.field}>

			<label className={styles.fieldTitle}>
				Cargos
			</label>

			<div className={styles.checkboxGroup}>

				{
					opciones.map(cargo => (
						<label key={cargo}>

							<input
								type="checkbox"
								checked={selected.includes(cargo)}
								onChange={() =>
									toggleCargo(cargo)
								}
							/>

							{cargo}

						</label>
					))
				}

			</div>

		</div>
	);
}