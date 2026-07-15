import styles from "./APDDetailItem.module.css";

export default function APDDetailItem({
	children,
	variantClassName = ""
}) {

	return (

		<div className={`${styles.item} ${variantClassName}`}>
			{children}
		</div>

	);

}