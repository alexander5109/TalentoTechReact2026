import styles from "./APDCheckboxFilterGroup.module.css"

export default function APDCheckboxFilterGroup({
	widgetLabel,
	name,
	value = [],
	onChange,
	options = []
}) {

	function manejarCheck(optionValue) {
		const nuevosValores = value.includes(optionValue)
			? value.filter(item => item !== optionValue)
			: [...value, optionValue]
		onChange({
			target: {
				name,
				value: nuevosValores
			}
		})

	}
	return <div className={styles.container}>
		<label className={styles.widgetLabel}>
			{widgetLabel}
		</label>
		<div className={styles.options}>
			{
				options.map(option => (
					<label
						key={option.value}
						className={styles.option}
					>
						<input
							type="checkbox"
							checked={
								value.includes(option.value)
							}
							onChange={() =>
								manejarCheck(option.value)
							}
						/>
						<span
							className={option.className || ""}
						>
							{option.label}
						</span>
					</label>
				))
			}
		</div>
	</div>
}