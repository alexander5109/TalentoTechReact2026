import styles from "./ApdFormField.module.css";

export default function ApdFormField({
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