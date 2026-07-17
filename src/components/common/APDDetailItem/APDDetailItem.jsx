import styles from "./ApdDetailItem.module.css";

export default function ApdDetailItem({
	children,
	variantClassName = ""
}) {

	return (

		<div className={`${styles.item} ${variantClassName}`}>
			{children}
		</div>

	);

}