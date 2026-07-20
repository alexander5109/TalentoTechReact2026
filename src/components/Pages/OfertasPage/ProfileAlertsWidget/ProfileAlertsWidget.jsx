import ApdH4 from "./../../../common/ApdH4/ApdH4";
import ApdLayoutStack from "./../../../common/ApdLayoutStack/ApdLayoutStack";

export default function ProfileAlertsWidget({
	value,
	onChange
}) {

	const options = [
		{ value: null, label: "Ninguna" },
		{ value: 6, label: "Cada 6 horas" },
		{ value: 12, label: "Cada 12 horas" },
		{ value: 24, label: "Cada 24 horas" },
	];

	return (
		<>
			{options.map(option => (
				<label key={option.label}>

					<input
						type="radio"
						name="alertFrequency"
						value={option.value ?? ""}
						checked={value === option.value}
						onChange={() => onChange(option.value)}
					/>

					{" "}
					{option.label}

				</label>
			))}

		</>
	);
}