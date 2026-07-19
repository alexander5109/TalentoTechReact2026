import ApdContainer from "../ApdContainer/ApdContainer"
import ApdLabel from "../ApdLabel/ApdLabel"
import styles from "./ApdCheckboxFilterGroup.module.css"

export default function ApdCheckboxFilterGroup({
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
	return <ApdContainer direction="column">
		<ApdLabel >{widgetLabel}</ApdLabel>
		<ApdContainer >{
			options.map(option => (
				<ApdLabel key={option.value} className={styles.option} >
					<input
						type="checkbox"
						checked={value.includes(option.value)}
						onChange={() => manejarCheck(option.value)}
					/>
					<span className={option.className || ""} > {option.label} </span>
				</ApdLabel>
			))
		}
		</ApdContainer>
	</ApdContainer>
}