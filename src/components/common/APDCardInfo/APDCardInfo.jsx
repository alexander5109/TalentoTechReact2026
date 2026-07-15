import APDPanel from "../APDPanel/APDPanel";
import styles from "./APDCardInfo.module.css";

export default function APDCardInfo({
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