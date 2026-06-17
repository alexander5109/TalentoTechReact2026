export default function SearchProfileCard({
	profile,
	selected,
	onSelect,
	onDelete
}) {
	return (
		<div
			onClick={() => onSelect(profile.id)}
		>
			<h4>{profile.nombre}</h4>

			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onDelete(profile.id);
				}}
			>
				Eliminar
			</button>
		</div>
	);
}