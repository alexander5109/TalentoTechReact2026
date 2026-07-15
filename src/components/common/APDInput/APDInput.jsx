import styles from "./APDInput.module.css";

export default function APDInput({
	as = "input",
	className = "",
	...props
}) {

	if (as === "textarea") {

		return (
			<textarea
				className={`${styles.input} ${styles.textarea} ${className}`}
				{...props}
			/>
		);

	}

	return (
		<input
			className={`${styles.input} ${className}`}
			{...props}
		/>
	);

}