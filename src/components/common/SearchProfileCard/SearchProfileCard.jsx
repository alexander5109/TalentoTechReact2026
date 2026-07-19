import ApdButton from "../ApdButton/ApdButton";

export default function SearchProfileCard({
	profile,
	onSelect,
	onDelete
}) {
	return (
		<div onClick={() => onSelect(profile.id)}>
			<h4>{profile.nombre}</h4>

			<ApdButton onClick={(e) => {
				e.stopPropagation();
				onDelete(profile.id);
			}} >
			</ApdButton>
		</div>
	);
}