import APDSection from "../../common/APDSection/APDSection";
import APDLabelH3 from "../../common/APDLabelH3/APDLabelH3";
import SearchProfileForm from "./SearchProfileForm/SearchProfileForm";
import styles from "./UserSearchProfilesPage.module.css"
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../../../firebase/ProfileService";
import APDButton from "../../common/APDButton/APDButton";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import SearchProfileList from "./SearchProfileList/SearchProfileList";



export default function UserSearchProfilesPage() {
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
	return <APDSection>

		<APDLabelH3
			upper="Perfiles de búsqueda"
			lower="Guarde sus filtros para reutilizarlos rápidamente."
		/>

		{loading ? (

			<ApdPrettyP>Cargando perfiles...</ApdPrettyP>

		) : (


			<div className={styles.layout}>
				<nav className={styles.sidebar}>
					<APDButton
						disabled={!hasChanges}
						onClick={handleSaveProfile}
					>
						Guardar cambios
					</APDButton>

					<APDButton onClick={handleCreateProfile}>
						+ Agregar perfil
					</APDButton>

					<SearchProfileList
						profiles={profiles}
						selectedProfileId={selectedProfileId}
						onSelect={setSelectedProfileId}
						onDelete={handleDeleteProfile}
					/>

				</nav>

				<section className={styles.editor}>

					{editingProfile ? (

						<>
							<SearchProfileForm
								profile={editingProfile}
								onChange={(changes) =>
									setEditingProfile(prev => ({
										...prev,
										...changes
									}))
								}
							/>
						</>

					) : (

						<div className={styles.emptyState}>
							<ApdPrettyP>
								Todavía no tiene perfiles de búsqueda guardados.
							</ApdPrettyP>

							<APDButton onClick={handleCreateProfile}>
								Crear mi primer perfil
							</APDButton>
						</div>

					)}

				</section>

			</div>

		)}

	</APDSection>
}