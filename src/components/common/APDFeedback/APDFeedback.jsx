import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./APDFeedback.module.css";

const ICONS = {
	error: "❌",
	warning: "⚠️",
	success: "✅",
	info: "ℹ️"
};

APDFeedback.propTypes = {
	type: PropTypes.oneOf([
		"error",
		"warning",
		"success",
		"info"
	]),
	message: PropTypes.string.isRequired,
	error: PropTypes.object,
	children: PropTypes.node
};

export default function APDFeedback({
	children,
	message,
	type = "error",
	error = null
}) {
	if (!message && !children)
		return null;

	useEffect(() => {

		if (!error) return;

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
	return (

		<div className={`${styles.feedback} ${styles[type]}`}>

			<p className={styles.message}>
				<span className={styles.icon}>
					{ICONS[type]}
				</span>

				{message}
			</p>

			{children}

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