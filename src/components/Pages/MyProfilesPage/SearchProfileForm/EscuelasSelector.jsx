import { useState } from "react";
import styles from "./SearchProfileForm.module.css";
import APDButton from "../../../common/APDButton/APDButton";

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
			<APDButton onClick={agregarEscuela}>
				Agregar
			</APDButton>
		</div>
		<ul className={styles.schoolList}>{
			schools.map(codigo => (
				<li key={codigo} className={styles.schoolItem} >
					{codigo}
					<APDButton onClick={() => eliminarEscuela(codigo)}>
						X
					</APDButton>
				</li>
			))
		}</ul>
	</div>
}