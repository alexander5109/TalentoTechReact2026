import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import SearchProfileForm from "./SearchProfileForm/SearchProfileForm";
import SearchProfilesPanel from "./SearchProfilesPanel/SearchProfilesPanel";
import styles from "./MyProfilesPage.module.css"
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
	getProfiles,
	createProfile,
	updateProfile,
	deleteProfile
} from "../../../firebase/ProfileService";



export default function MyProfilesPage() {

	const { user } = useAuth();
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadProfiles() {

			if (!user) {
				setProfiles([]);
				setLoading(false);
				return;
			}

			const profiles =
				await getProfiles(user.uid);

			setProfiles(profiles);

			if (profiles.length > 0) {
				setSelectedProfileId(
					profiles[0].id
				);
			}

			setLoading(false);
		}

		loadProfiles();

	}, [user]);

	const [selectedProfileId, setSelectedProfileId] = useState(profiles.length > 0 ? profiles[0].id : null);
	const selectedProfile = profiles.find(p => p.id === selectedProfileId) ?? profiles[0];

	async function handleCreateProfile() {

		const profile = {
			nombre: "Nuevo perfil",
			distritos: [],
			niveles: [],
			cargos: [],
			escuelas: []
		};

		const created =
			await createProfile(
				user.uid,
				profile
			);

		setProfiles(prev => [
			...prev,
			created
		]);

		setSelectedProfileId(created.id);
	}
	async function handleDeleteProfile(id) {

		await deleteProfile(
			user.uid,
			id
		);

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
	async function updateSelectedProfile(changes) {

		await updateProfile(
			user.uid,
			selectedProfileId,
			changes
		);

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




	if (loading) {
		return (
			<TextContainer>
				Cargando perfiles...
			</TextContainer>
		);
	}

	if (!selectedProfile) {
		return <TextContainer>
			<button className={`${styles.button}${styles.primary}`}
				type="button" onClick={handleCreateProfile}>
				Crear primer perfil
			</button>
		</TextContainer>
	}


	return <TextContainer>
		<SectionTitleH3
			upper="Mis perfiles"
			lower="Búsquedas guardadas"
		/>
		<div className={styles.layout}>
			<aside className={styles.sidebar}>
				<button className={`${styles.button}${styles.primary}`}
					onClick={handleCreateProfile}>
					+ Nuevo perfil
				</button>
				<SearchProfilesPanel
					profiles={profiles}
					selectedProfileId={selectedProfileId}
					setSelectedProfileId={setSelectedProfileId}
					deleteProfile={handleDeleteProfile}
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