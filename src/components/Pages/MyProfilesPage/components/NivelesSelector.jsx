import styles from "../common.module.css"

export default function NivelesSelector({
	opciones,
	selected,
	onChange
}) {

	function toggleNivel(nivel) {

		if (selected.includes(nivel)) {

			onChange(
				selected.filter(x => x !== nivel)
			);

			return;
		}

		onChange([
			...selected,
			nivel
		]);
	}

	return (
		<div className={styles.field}>

			<label className={styles.fieldTitle}>
				Niveles
			</label>

			<div className={styles.checkboxGroup}>

				{
					opciones.map(nivel => (
						<label key={nivel}>

							<input
								type="checkbox"
								checked={selected.includes(nivel)}
								onChange={() =>
									toggleNivel(nivel)
								}
							/>

							{nivel}

						</label>
					))
				}

			</div>

		</div>
	);
}