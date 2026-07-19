import ApdButton from "../../../common/ApdButton/ApdButton";
import ApdComboBox from "../../../common/ApdComboBox/ApdComboBox";
import SearchProfileCard from "../../../common/SearchProfileCard/SearchProfileCard";
import ApdH3 from "../../../common/ApdH3/ApdH3";
import { useState, useEffect } from "react";

import ApdLayoutStack from "../../../common/ApdLayoutStack/ApdLayoutStack";


export default function BusquedasContainer({
	profiles = [],
	selectedProfileId,
	onSelectProfile,
	onSaveProfile,
	onDeleteProfile
}) {
	// -------------------------- state------------------------------- //
	// const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(true);
	// const [selectedProfileId, setSelectedProfileId] = useState(null);

	const selectedProfile = profiles.find(p => p.id === selectedProfileId) ?? profiles[0];

	const [editingProfile, setEditingProfile] = useState(null);
	useEffect(() => {
		if (selectedProfile) {
			setEditingProfile({
				...selectedProfile
			});
		}
	}, [selectedProfile]);

	const hasChanges = editingProfile && JSON.stringify(editingProfile) != JSON.stringify(selectedProfile);

	const profileOptions = profiles.map(profile => ({

		value: profile.id,

		label: profile.nombre

	}));


	return <>
		<ApdComboBox
			value={selectedProfileId}
			onChange={onSelectProfile}
			options={profileOptions}
			placeholder="Seleccionar perfil"
		/>
		{/* <>
			{profiles.map(profile => (
				<SearchProfileCard
					key={profile.id}
					profile={profile}
					selected={profile.id === selectedProfileId}
					onSelect={onSelectProfile}
					onDelete={onDeleteProfile}
				/>
			))
			}
		</> */}
		<ApdLayoutStack >
			<ApdButton disabled={!hasChanges} onClick={onSaveProfile} variant="primary">
				🔖 Crear nuevo
			</ApdButton>
			<ApdButton disabled={!hasChanges} onClick={onSaveProfile} variant="secondary">
				🔖 Guardar perfil de búsqueda
			</ApdButton>
			<ApdButton onClick={onDeleteProfile} variant="danger" disabled={selectedProfile == null}>
				🔖 Eliminar perfil
			</ApdButton>
		</ApdLayoutStack>
	</ >
}