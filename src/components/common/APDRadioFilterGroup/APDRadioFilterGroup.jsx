import styles from "./APDRadioFilterGroup.module.css"

export default function APDRadioFilterGroup({
	label,
	name,
	value,
	onChange,
	options
}) {

	return (

		<div className={styles.container}>

			<label className={styles.groupLabel}>
				{label}
			</label>

			<div className={styles.radioGroup}>

				{
					options.map(option => (

						<label
							key={option.value}
							className={styles.radioOption}
						>

							<input
								type="radio"
								name={name}
								value={option.value}
								checked={
									value === option.value
								}
								onChange={onChange}
							/>

							<span
								className={
									option.className || ""
								}
							>
								{option.label}
							</span>

						</label>
					))
				}

			</div>

		</div>
	)
}