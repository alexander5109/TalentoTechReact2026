import styles from "./APDFormField.module.css";

export default function APDFormField({
	label,
	htmlFor,
	children,
	className = ""
}) {

	return (

		<div className={`${styles.formGroup} ${className}`}>

			<label htmlFor={htmlFor}>
				{label}
			</label>

			{children}

		</div>

	);

}