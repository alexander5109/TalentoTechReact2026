import ApdButton from "./../../../common/ApdButton/ApdButton";
import ApdComboBox from "./../../../common/ApdComboBox/ApdComboBox";
import ApdSelect from "./../../../common/ApdSelect/ApdSelect";
import SearchProfileCard from "./../../../common/SearchProfileCard/SearchProfileCard";
import ApdH3 from "./../../../common/ApdH3/ApdH3";
import ApdH4 from "./../../../common/ApdH4/ApdH4";
import { useState } from "react";

import ApdLayoutStack from "./../../../common/ApdLayoutStack/ApdLayoutStack";
import ProfileAlertsWidget from "./../ProfileAlertsWidget/ProfileAlertsWidget";
import ApdCheckboxFilterGroup from "./../../../common/ApdCheckboxFilterGroup/ApdCheckboxFilterGroup";
import ApdLabel from "./../../../common/ApdLabel/ApdLabel";

const ALERTA_TYPES = [
	{
		label: "SMS",
		value: "SMS",
	},
	{
		label: "WhatsApp",
		value: "WhatsApp",
	},
	{
		label: "Correo",
		value: "Correo",
	},
	{
		label: "ApdSite",
		value: "ApdSite",
	}
];

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
		<ApdLayoutStack direction="row">
			<ApdLayoutStack >
				<ApdLayoutStack >
					<ApdLabel>🔔 Alertas</ApdLabel>
					<ProfileAlertsWidget value={selectedProfile?.alerta?.freq}></ProfileAlertsWidget>
				</ApdLayoutStack>
				<ApdLayoutStack >
					<ApdCheckboxFilterGroup
						widgetLabel="🔔 Modo de alerta:"
						name="alertaModes"
						value={selectedProfile?.alerta?.dest}
						onChange={onUpdateProfile}
						options={ALERTA_TYPES}
					/>
				</ApdLayoutStack>
			</ApdLayoutStack>
		</ApdLayoutStack>
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