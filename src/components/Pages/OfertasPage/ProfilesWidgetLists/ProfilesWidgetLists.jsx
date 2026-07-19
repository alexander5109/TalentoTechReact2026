import ApdButton from "../../../common/ApdButton/ApdButton";
import ApdComboBox from "../../../common/ApdComboBox/ApdComboBox";
import ApdSelect from "../../../common/ApdSelect/ApdSelect";
import SearchProfileCard from "../../../common/SearchProfileCard/SearchProfileCard";
import ApdH3 from "../../../common/ApdH3/ApdH3";
import { useState } from "react";

import ApdLayoutStack from "../../../common/ApdLayoutStack/ApdLayoutStack";


export default function ProfilesWidgetLists({
	profiles = [],
	selectedProfileId,
	hasFilters,
	hasChanges,
	onSelectProfile,
	onUpdateProfile,
	onCreateProfile,
	onDeleteProfile
}) {
	const selectedProfile = profiles.find(p => p.id === selectedProfileId);
	const profileOptions = profiles.map(profile => ({
		value: profile.id,
		label: profile.nombre
	}));

	return <>
		<ApdSelect
			value={selectedProfileId}
			options={profileOptions}
			placeholder="Nueva búsqueda..."
			onChange={onSelectProfile}
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
			<ApdButton onClick={onCreateProfile} disabled={!hasFilters} variant="primary">
				➕ Guardar como nuevo
			</ApdButton>
			<ApdButton disabled={!hasChanges} variant="secondary" onClick={onUpdateProfile}>
				💾 Actualizar perfil
			</ApdButton>
			<ApdButton onClick={() => onDeleteProfile(selectedProfileId)} variant="danger" disabled={selectedProfile == null}>
				🔖 Eliminar perfil
			</ApdButton>
		</ApdLayoutStack>
	</ >
}