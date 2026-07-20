import ApdLayoutStack from "./../ApdLayoutStack/ApdLayoutStack"
import styles from "./ApdRadioFilterGroup.module.css"

export default function ApdRadioFilterGroup({
	label,
	name,
	value,
	onChange,
	options
}) {

	return (

		<ApdLayoutStack>
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

		</ApdLayoutStack>
	)
}