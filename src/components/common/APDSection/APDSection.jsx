import ApdSurface from "../ApdSurface/ApdSurface";
import styles from "./ApdSection.module.css";

export default function ApdSection({
	children,
	image = null,
}) {
	const imageRight = image?.side === "right";
	return (

		<section>

			<ApdSurface
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

			</ApdSurface>

		</section>

	);

}