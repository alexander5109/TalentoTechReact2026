import SearchProfileCard from "../SearchProfileCard/SearchProfileCard";

export default function SearchProfileList({
	profiles,
	selectedProfileId,
	onSelect,
	onDelete
}) {
	return (
		<>{profiles.map(profile => (
			<SearchProfileCard
				key={profile.id}
				profile={profile}
				selected={profile.id === selectedProfileId}
				onSelect={onSelect}
				onDelete={onDelete}
			/>
		))
		}</>
	);
}