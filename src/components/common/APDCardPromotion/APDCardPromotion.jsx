import APDPanel from "../APDPanel/APDPanel";
import styles from "./APDCardPromotion.module.css";

export default function APDCardPromotion({
	name,
	type,
	duration,
	children
}) {
	return (
		<APDPanel>
			<h3 className={styles.title}>
				{name}
			</h3>
			<h3 className={styles.title}>
				{type}
			</h3>
			<h3 className={styles.type}>
				{duration}
			</h3>
			<h3 className={styles.type}>
				{type}
			</h3>
			{children}

		</APDPanel>
	);
}