import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import CargosSelector from "./components/NivelesSelector"
import DistritosSelector from "./components/NivelesSelector"
import EscuelasSelector from "./components/NivelesSelector"
import NivelesSelector from "./components/NivelesSelector"

import styles from "./MyProfilesPage.module.css"
import { useState } from "react";

import Swal from "sweetalert2"

const DISTRITOS = [
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
	"Preceptor"
];

const STORAGE_KEY = "apd-profile";


export function createTeacherProfile() {
	return {
		distritos: [],
		nivel: "",
		cargos: [],
		escuelas: []
	};
}

export default function MyProfilesPage() {
	const [profile, setProfile] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved
			? JSON.parse(saved)
			: createTeacherProfile();
	});
	function manejarSubmit(e) {
		e.preventDefault();
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(profile)
		);
		Swal.fire({
			title: "Perfil guardado",
			text: `Cambios guardados en local storage`,
			icon: "success",
			timer: 1000,
			showConfirmButton: false,
			toast: true,
			position: "center"
		})
	}

	return <TextContainer>
		<SectionTitleH3
			upper="Mis Perfiles de búsqueda"
			lower="Agiliza tus búsquedas"
		/>
		<PrettyText>
			La idea es poner un superformulario acá que permita configurar todas mis filtros de busqueda.
		</PrettyText>
		<form className={styles.form} onSubmit={manejarSubmit} >
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
}