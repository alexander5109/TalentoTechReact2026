import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./ApdFeedback.module.css";

const ICONS = {
	error: "❌",
	warning: "⚠️",
	success: "✅",
	info: "ℹ️"
};

ApdFeedback.propTypes = {
	feedback: PropTypes.shape({

		type: PropTypes.oneOf([
			"error",
			"warning",
			"success",
			"info"
		]),

		message: PropTypes.string,

		error: PropTypes.object

	})
};

export default function ApdFeedback({
	feedback = null
}) {

	const type = feedback?.type ?? "error";
	const message = feedback?.message ?? "";
	const error = feedback?.error ?? null;


	useEffect(() => {

		if (!error)
			return;

		switch (type) {

			case "error":
				console.error(error);
				break;

			case "warning":
				console.warn(error);
				break;

			default:
				console.log(error);

		}

	}, [error, type]);


	if (!feedback)
		return null;


	return (

		<div className={`${styles.feedback} ${styles[type]}`}>

			<p className={styles.message}>

				<span className={styles.icon}>
					{ICONS[type]}
				</span>

				{message}

			</p>


			{error && (

				<details className={styles.details}>

					<summary>
						Detalles técnicos
					</summary>

					<small>

						<strong>
							{error.name ?? "Error"}
						</strong>

						<br />

						{error.message ?? String(error)}

					</small>

				</details>

			)}

		</div>

	);

}