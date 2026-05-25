import Surface from "../Surface/Surface"

import styles from "./TextContainerConImage.module.css"

export default function TextContainerConImage({
	children,
	image,
	imageAlt = "",
	imageSide = "left"
}) {

	const imageRight = imageSide === "right"

	return (
		<Surface
			className={
				`${styles.container}
				${imageRight ? styles.reverse : ""}`
			}
		>

			<div className={styles.imageContainer}>

				<img
					src={image}
					alt={imageAlt}
					className={styles.image}
				/>

			</div>

			<div className={styles.content}>
				{children}
			</div>

		</Surface>
	)
}