import { useState } from "react";
import styles from "./SearchProfileForm.module.css";

export default function EscuelasSelector({
	schools,
	onChange
}) {
	const [userInput, setUserInput] = useState("");
	function agregarEscuela() {
		const value = userInput.trim().toUpperCase();
		if (!value) return;
		if (schools.includes(value))
			return;
		onChange([...schools, value]);
		setUserInput("");
	}
	function eliminarEscuela(codigo) {
		onChange(schools.filter(x => x !== codigo));
	}
	return <div className={styles.field}>
		<label className={styles.fieldTitle}>
			Escuelas favoritas
		</label>
		<div className={styles.field}>
			<input
				type="text"
				placeholder="Ej: 0009MS3011"
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
			/>
			<button className={`${styles.button}${styles.primary}`}
				type="button" onClick={agregarEscuela}>
				Agregar
			</button>
		</div>
		<ul className={styles.schoolList}>{
			schools.map(codigo => (
				<li key={codigo} className={styles.schoolItem} >
					{codigo}
					<button className={`${styles.button}${styles.primary}`}
						type="button" onClick={() => eliminarEscuela(codigo)}>
						X
					</button>
				</li>
			))
		}</ul>
	</div>
}