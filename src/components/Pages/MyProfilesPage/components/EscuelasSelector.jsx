
export default function EscuelasSelector(opciones, onChange) {
	const [input, setInput] = useState("");
	function agregarEscuela() {
		const value = input.trim();
		if (!value) return;
		if (opciones.includes(value)) return;
		onChange([...opciones, value]);
		setInput("");
	}
	function eliminarEscuela(codigo) {
		onChange(opciones.filter(x => x !== codigo));
	}
	return (
		<div className={styles.field}>
			<label className={styles.fieldTitle}>
				Escuelas Favoritas
			</label>
			<div className={styles.field}>
				<input
					type="text"
					placeholder="Ej: 0009MS3011"
					value={input}
					onChange={(e) =>
						setInput(e.target.value)
					}
				/>
				<button type="button" onClick={agregarEscuela}>
					Agregar
				</button>

			</div>

			<ul className={styles.schoolList}> {
				opciones.map(codigo => (
					<li key={codigo} className={styles.schoolItem}>
						{codigo}
						<button type="button" onClick={() => eliminarEscuela(codigo)}>
							X
						</button>
					</li>
				))
			}
			</ul>
		</div>
	);
}
