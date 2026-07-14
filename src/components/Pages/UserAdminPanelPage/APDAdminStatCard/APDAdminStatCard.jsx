import APDPanel from "../../../common/APDPanel/APDPanel";
import styles from "./APDAdminStatCard.module.css";

export default function APDAdminStatCard({
	icon,
	title,
	value,
	children
}) {
	return (
		<APDPanel>

			<h3 className={styles.title}>
				{icon} {title}
			</h3>

			{value && (
				<p className={styles.value}>
					{value}
				</p>
			)}

			{children}

		</APDPanel>
	);
}