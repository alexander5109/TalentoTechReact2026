import styles from "./APDFormField.module.css";

export default function APDFormField({
	label,
	id,
	name,
	type = "text",
	className = "",
	...props
}) {

	const inputId = id ?? name;

	return (
		<div className={`${styles.formGroup} ${className}`}>

			<label htmlFor={inputId}>
				{label}
			</label>

			<input
				id={inputId}
				name={name}
				type={type}
				{...props}
			/>

		</div>
	);

}