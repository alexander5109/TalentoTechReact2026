import APDSurface from "../APDSurface/APDSurface";
import styles from "./APDSection.module.css";

export default function APDSection({
	children,
	image = null,
}) {
	const imageRight = image?.side === "right";
	return (

		<section>

			<APDSurface
				className={
					image
						? `${styles.container} ${imageRight ? styles.reverse : ""}`
						: ""
				}
			>

				{image && (

					<div className={styles.imageContainer}>

						<img
							src={image.src}
							alt={image.alt ?? ""}
							className={styles.image}
						/>

					</div>

				)}

				<div className={styles.content}>
					{children}
				</div>

			</APDSurface>

		</section>

	);

}