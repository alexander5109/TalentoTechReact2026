import SearchProfileList from "../SearchProfileList/SearchProfileList"

export default function SearchProfilesPanel({
	profiles,
	selectedProfileId,
	setSelectedProfileId,
	deleteProfile
}) {
	return (
		<SearchProfileList
			profiles={profiles}
			selectedProfileId={selectedProfileId}
			onSelect={setSelectedProfileId}
			onDelete={deleteProfile}
		/>
	);
}