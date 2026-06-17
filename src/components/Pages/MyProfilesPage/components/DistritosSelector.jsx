
export default function DistritosSelector(opciones, selected, onChange) {
	function toggleDistrito(distrito) {
		if (selected.includes(distrito)) {
			onChange(
				selected.filter(x => x !== distrito)
			);
			return;
		}
		if (selected.length >= 3) {
			Swal.fire({
				title: "Invalido",
				text:
					`Máximo 3 distritos`,
				icon: "warning",
				timer: 1000,
				showConfirmButton: false,
				toast: true,
				position: "center"
			})
			return;
		}
		onChange([
			...selected,
			distrito
		]);
	}
	return (
		<div className={styles.field}>
			<label className={styles.fieldTitle}>
				Distritos
			</label>
			<div className={styles.checkboxGroup}>
				{
					opciones.map(distrito => (
						<label key={distrito}>
							<input
								type="checkbox"
								checked={selected.includes(distrito)}
								onChange={() =>
									toggleDistrito(distrito)
								}
							/>

							{distrito}
						</label>
					))
				}
			</div>
		</div>
	);
}
