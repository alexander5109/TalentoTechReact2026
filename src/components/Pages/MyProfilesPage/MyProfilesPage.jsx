import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import SearchProfileForm from "./SearchProfileForm/SearchProfileForm";
import SearchProfilesPanel from "./SearchProfilesPanel/SearchProfilesPanel";
import styles from "./MyProfilesPage.module.css"
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../../../firebase/ProfileService";
import APDButton from "../../common/APDButton/APDButton";



export default function MyProfilesPage() {
	// -------------------------- state------------------------------- //
	const { user } = useAuth();
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedProfileId, setSelectedProfileId] = useState(null);
	const [editingProfile, setEditingProfile] = useState(null);

	const selectedProfile = profiles.find(p => p.id === selectedProfileId) ?? profiles[0];
	const hasChanges = editingProfile && JSON.stringify(editingProfile) != JSON.stringify(selectedProfile);

	// -------------------------- effects------------------------------- //
	useEffect(() => {
		if (selectedProfile) {
			setEditingProfile({
				...selectedProfile
			});
		}
	}, [selectedProfile]);
	useEffect(() => {
		async function loadProfiles() {
			if (!user) {
				setProfiles([]);
				setLoading(false);
				return;
			}
			const profiles = await getProfiles(user.uid);
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


	// -------------------------- handlers------------------------------- //
	async function handleSaveProfile() {
		await updateProfile(
			user.uid,
			editingProfile.id,
			editingProfile
		);
		setProfiles(prev =>
			prev.map(profile =>
				profile.id === editingProfile.id
					? editingProfile
					: profile
			)
		);
	}

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


	// -------------------------- ok content------------------------------- //
	if (loading) {
		return (
			<TextContainer>
				Cargando perfiles...
			</TextContainer>
		);
	}
	if (!selectedProfile) {
		return <TextContainer>
			<APDButton onClick={handleCreateProfile}>
				Crear primer perfil
			</APDButton>
		</TextContainer>
	}
	return <TextContainer>
		<SectionTitleH3
			upper="Mis perfiles"
			lower="Búsquedas guardadas"
		/>
		<div className={styles.layout}>
			<aside className={styles.sidebar}>
				<APDButton onClick={handleCreateProfile}>
					+ Nuevo perfil
				</APDButton>
				<SearchProfilesPanel
					profiles={profiles}
					selectedProfileId={selectedProfileId}
					setSelectedProfileId={setSelectedProfileId}
					deleteProfile={handleDeleteProfile}
				/>
			</aside>
			<section className={styles.editor}>
				{editingProfile && (
					<SearchProfileForm
						profile={editingProfile}
						onChange={(changes) =>
							setEditingProfile(prev => ({ ...prev, ...changes }))
						}
					/>
				)}
				<APDButton disabled={!hasChanges} onClick={handleSaveProfile}>
					Guardar cambios
				</APDButton>
			</section>
		</div>
	</TextContainer>
}