import styles from "./ApdSelect.module.css";
import inputStyles from "../ApdInput/ApdInput.module.css";

export default function ApdSelect({
	options = [],
	placeholder,
	className = "",
	onChange,
	...props
}) {
	return (
		<select
			className={`${inputStyles.input} ${styles.select} ${className}`}
			onChange={e => onChange?.(e.target.value)}
			{...props}
		>
			{placeholder && (
				<option value="">
					{placeholder}
				</option>
			)}

			{options.map((option) => {
				const item =
					typeof option === "string"
						? { value: option, label: option }
						: option;

				return (
					<option
						key={item.value}
						value={item.value}
					>
						{item.label}
					</option>
				);
			})}
		</select>
	);
}