import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";

import styles from "./MyProfilePage.module.css"
import { useState } from "react";

import Swal from "sweetalert2"

const DISTRITOS = [
	"Avellaneda",
	"Lanús",
	"Quilmes",
	"Lomas de Zamora",
	"Morón",
];

const NIVELES = [
	"Inicial",
	"Primaria",
	"Secundaria",
	"Especial",
	"Adultos",
];

const CARGOS = [
	"MG",
	"PR",
	"EMATP",
	"Bibliotecario",
	"Preceptor",
];

const STORAGE_KEY = "apd-profile";

const DEFAULT_PROFILE = {
	distritos: [],
	nivel: "",
	cargos: [],
	escuelas: [],
};

export default function MyProfilePage() {


	const [profile, setProfile] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);

		return saved
			? JSON.parse(saved)
			: DEFAULT_PROFILE;
	});


	function manejarSubmit(e) {
		e.preventDefault();

		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(profile)
		);

		Swal.fire({
			title: "Perfil guardado",
			text:
				`Cambios guardados en local storage`,
			icon: "success",
			timer: 1000,
			showConfirmButton: false,
			toast: true,
			position: "center"
		})
	}


	function DistritosSelector({
		options,
		selected,
		onChange
	}) {

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
				<label>Distritos</label>

				{
					options.map(distrito => (
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
		);
	}
	function NivelesSelector({
		options,
		value,
		onChange
	}) {

		return (
			<div className={styles.field}>
				<label>Nivel o modalidad</label>

				<select
					value={value}
					onChange={e => onChange(e.target.value)}
				>
					<option value="">
						Seleccionar...
					</option>

					{
						options.map(option => (
							<option
								key={option}
								value={option}
							>
								{option}
							</option>
						))
					}
				</select>
			</div>
		);
	}

	function CargosSelector({
		options,
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
				<label>Cargos</label>

				{
					options.map(cargo => (
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
		);
	}


	function EscuelasSelector({
		schools,
		onChange
	}) {

		const [input, setInput] = useState("");

		function agregarEscuela() {

			const value = input.trim();

			if (!value) return;

			if (schools.includes(value))
				return;

			onChange([
				...schools,
				value
			]);

			setInput("");
		}

		function eliminarEscuela(codigo) {

			onChange(
				schools.filter(x => x !== codigo)
			);
		}

		return (
			<div>

				<label className={styles.field}>
					Escuelas favoritas
				</label>

				<div>

					<input
						type="text"
						placeholder="Ej: 0009MS3011"
						value={input}
						onChange={(e) =>
							setInput(e.target.value)
						}
					/>

					<button
						type="button"
						onClick={agregarEscuela}
					>
						Agregar
					</button>

				</div>

				<ul>
					{
						schools.map(codigo => (
							<li key={codigo}>

								{codigo}

								<button
									type="button"
									onClick={() =>
										eliminarEscuela(codigo)
									}
								>
									X
								</button>

							</li>
						))
					}
				</ul>

			</div>
		);
	}


	return (
		<>
			<TextContainer>

				<SectionTitleH3
					upper="Mi Perfil Docente"
					lower="Agiliza tus búsquedas"
				/>

				<PrettyText>
					La idea es poner un superformulario acá que permita configurar todas mis filtros de busqueda.
				</PrettyText>

				<form
					className={styles.form}
					onSubmit={manejarSubmit}
				>
					<DistritosSelector
						options={DISTRITOS}
						selected={profile.distritos}
						onChange={(newDistritos) =>
							setProfile(prev => ({
								...prev,
								distritos: newDistritos
							}))
						}
					/>

					<NivelesSelector
						options={NIVELES}
						value={profile.niveles}
						onChange={(newDistritos) =>
							setProfile(prev => ({
								...prev,
								niveles: newDistritos
							}))
						}
					/>

					<CargosSelector
						options={CARGOS}
						selected={profile.cargos}
						onChange={(newCargos) =>
							setProfile(prev => ({
								...prev,
								cargos: newCargos
							}))
						}
					/>

					<EscuelasSelector
						schools={profile.escuelas}
						onChange={(newEscuelas) =>
							setProfile(prev => ({
								...prev,
								escuelas: newEscuelas
							}))
						}
					/>

					<button type="submit">
						Guardar Perfil
					</button>

				</form>

			</TextContainer>
		</>
	)
}