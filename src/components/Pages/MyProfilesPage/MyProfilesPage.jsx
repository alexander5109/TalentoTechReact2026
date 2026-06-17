import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import CargosSelector from "./components/CargosSelector"
import DistritosSelector from "./components/DistritosSelector"
import EscuelasSelector from "./components/EscuelasSelector"
import NivelesSelector from "./components/NivelesSelector"

import styles from "./MyProfilesPage.module.css"
import { useState, useEffect } from "react";

// import Swal from "sweetalert2"


const DISTRITOS = [
	"La Matanza",
	"Avellaneda",
	"Lanús",
	"Quilmes",
	"Lomas de Zamora",
	"Morón"
];

const NIVELES = [
	"Inicial",
	"Primaria",
	"Secundaria",
	"Especial",
	"Adultos"
];

const CARGOS = [
	"MG",
	"PR",
	"EMATP",
	"Bibliotecario",
	"Preceptor",
	"Historia",
	"Ciencias Sociales",
	"Trabajo y ciudadanía",
];

const STORAGE_KEY = "apd-profile";

function createSearchProfile() {
	return {
		id: crypto.randomUUID(),
		nombre: "Nuevo perfil",
		distritos: [],
		niveles: [],
		cargos: [],
		escuelas: []
	};
}

function createDefaultProfiles() {
	return [
		{
			id: crypto.randomUUID(),
			nombre: "Secundaria",
			distritos: ["Morón"],
			niveles: ["Secundaria"],
			cargos: ["EMATP"],
			escuelas: []
		}
	];
}


export default function MyProfilesPage() {
	const [profiles, setProfiles] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? JSON.parse(saved) : createDefaultProfiles();
	});
	useEffect(() => {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(profiles)
		);

	}, [profiles]);
	const [selectedProfileId, setSelectedProfileId] = useState(
		profiles.length > 0
			? profiles[0].id
			: null
	);

	const selectedProfile = profiles.find(p => p.id === selectedProfileId) ?? profiles[0];

	if (!selectedProfile) {
		return (
			<TextContainer>
				<button
					type="button"
					onClick={createProfile}>
					Crear primer perfil
				</button>
			</TextContainer>
		);
	}

	function updateSelectedProfile(changes) {
		setProfiles(prev =>
			prev.map(profile =>
				profile.id === selectedProfileId
					? {
						...profile,
						...changes
					}
					: profile
			)
		);
	}
	function createProfile() {

		const newProfile = createSearchProfile();
		setProfiles(prev => [
			...prev,
			newProfile
		]);

		setSelectedProfileId(
			newProfile.id
		);
	}
	function deleteProfile(id) {

		const remaining =
			profiles.filter(
				p => p.id !== id
			);

		setProfiles(remaining);

		if (remaining.length > 0) {
			setSelectedProfileId(
				remaining[0].id
			);
		}
	}

	return <TextContainer>

		<SectionTitleH3
			upper="Mis perfiles"
			lower="Búsquedas guardadas"
		/>

		<div className={styles.layout}>

			<aside className={styles.sidebar}>

				<button className={styles.newProfileButton} onClick={createProfile} >
					+ Nuevo perfil
				</button>

				{
					profiles.map(profile => (
						<div
							key={profile.id}
							className={
								profile.id === selectedProfileId
									? styles.activeCard
									: styles.card
							}
							onClick={() =>
								setSelectedProfileId(
									profile.id
								)
							}
						>
							<h4>{profile.nombre}</h4>

							<button className={styles.newProfileButton}
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									deleteProfile(
										profile.id
									);
								}}
							>
								Eliminar
							</button>
						</div>
					))
				}

			</aside>

			<section className={styles.editor}>

				<input
					className={styles.profileName}
					value={selectedProfile.nombre}
					onChange={(e) =>
						updateSelectedProfile({
							nombre:
								e.target.value
						})
					}
				/>
				<PrettyText>
					La idea es poner un superformulario acá que permita configurar todas mis filtros de busqueda.
				</PrettyText>
				<form
					className={styles.form}
				>
					<DistritosSelector
						opciones={DISTRITOS}
						selected={selectedProfile.distritos}
						onChange={(newDistritos) =>
							updateSelectedProfile({
								distritos: newDistritos
							})
						}
					/>
					<NivelesSelector
						opciones={NIVELES}
						selected={selectedProfile.niveles}
						onChange={(newNiveles) =>
							updateSelectedProfile({
								niveles: newNiveles
							})
						}
					/>
					<CargosSelector
						opciones={CARGOS}
						selected={selectedProfile.cargos}
						onChange={(newCargos) =>
							updateSelectedProfile({
								cargos: newCargos
							})
						}
					/>
					<EscuelasSelector
						schools={selectedProfile.escuelas}
						onChange={(newEscuelas) =>
							updateSelectedProfile({
								escuelas: newEscuelas
							})
						}
					/>
					{/* <button type="submit">
						Guardar Perfil
					</button> */}
				</form>
			</section>

		</div>

	</TextContainer>
}