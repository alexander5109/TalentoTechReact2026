import styles from "./ApdInput.module.css";

export default function ApdInput({
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