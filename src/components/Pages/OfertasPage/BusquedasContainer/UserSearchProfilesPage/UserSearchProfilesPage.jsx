import ApdSection from "../../../../common/ApdSection/ApdSection";
import ApdLabelH3 from "../../../../common/ApdLabelH3/ApdLabelH3";
import SearchProfileForm from "./SearchProfileForm/SearchProfileForm";
import styles from "./UserSearchProfilesPage.module.css"
import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../../../../../firebase/ProfileService";
import ApdButton from "../../../../common/ApdButton/ApdButton";
import ApdPrettyP from "../../../../common/ApdPrettyP/ApdPrettyP";



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

	// -------------------------- ok content------------------------------- //
	return <ApdSection>

		<ApdLabelH3
			upper="Perfiles de búsqueda"
			lower="Guarde sus filtros para reutilizarlos rápidamente."
		/>

		{loading ? (

			<ApdPrettyP>Cargando perfiles...</ApdPrettyP>

		) : (


			<div className={styles.layout}>
				<nav className={styles.sidebar}>
					<ApdButton
						disabled={!hasChanges}
						onClick={handleSaveProfile}
					>
						Guardar cambios
					</ApdButton>

					<ApdButton onClick={handleCreateProfile}>
						+ Agregar perfil
					</ApdButton>


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

							<ApdButton onClick={handleCreateProfile}>
								Crear mi primer perfil
							</ApdButton>
						</div>

					)}

				</section>

			</div>

		)}

	</ApdSection>
}