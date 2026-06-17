import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import SearchProfileForm from "./SearchProfileForm/SearchProfileForm";
import SearchProfilesPanel from "./SearchProfilesPanel/SearchProfilesPanel";
import styles from "./MyProfilesPage.module.css"
import { useState, useEffect } from "react";

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
		localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
	}, [profiles]);
	const [selectedProfileId, setSelectedProfileId] = useState(profiles.length > 0 ? profiles[0].id : null);
	const selectedProfile = profiles.find(p => p.id === selectedProfileId) ?? profiles[0];

	if (!selectedProfile) {
		return <TextContainer>
			<button type="button" onClick={createProfile}>
				Crear primer perfil
			</button>
		</TextContainer>
	}

	function createProfile() {
		const newProfile = createSearchProfile();
		setProfiles(prev => [...prev, newProfile]);
		setSelectedProfileId(newProfile.id);
	}
	function deleteProfile(id) {
		const remaining = profiles.filter(p => p.id !== id);
		setProfiles(remaining);
		if (remaining.length > 0) {
			setSelectedProfileId(remaining[0].id);
		}
	}

	function updateSelectedProfile(changes) {
		setProfiles(prev =>
			prev.map(profile =>
				profile.id === selectedProfileId
					? { ...profile, ...changes }
					: profile
			)
		);
	}
	return <TextContainer>
		<SectionTitleH3
			upper="Mis perfiles"
			lower="Búsquedas guardadas"
		/>
		<div className={styles.layout}>
			<aside className={styles.sidebar}>
				<button className={styles.newProfileButton} onClick={createProfile}>
					+ Nuevo perfil
				</button>
				<SearchProfilesPanel
					profiles={profiles}
					selectedProfileId={selectedProfileId}
					setSelectedProfileId={setSelectedProfileId}
					deleteProfile={deleteProfile}
				/>
			</aside>
			<section className={styles.editor}>
				<SearchProfileForm
					selectedProfile={selectedProfile}
					updateSelectedProfile={updateSelectedProfile}
				/>
			</section>
		</div>
	</TextContainer>
}