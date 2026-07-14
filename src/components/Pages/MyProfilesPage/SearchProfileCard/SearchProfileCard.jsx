import APDButton from "../../../common/APDButton/APDButton";

export default function SearchProfileCard({
	profile,
	onSelect,
	onDelete
}) {
	return (
		<div
			onClick={() => onSelect(profile.id)}
		>
			<h4>{profile.nombre}</h4>

			<APDButton onClick={(e) => {
				e.stopPropagation();
				onDelete(profile.id);
			}} >
			</APDButton>
		</div>
	);
}