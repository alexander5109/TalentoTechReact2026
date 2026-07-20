import { useEffect, useState } from "react";
import styles from "./AvatarPicker.module.css";


export default function AvatarPicker({
	currentImage = null,
	file = null,
	onChange
}) {


	const [avatarPreview, setPreview] = useState(currentImage);
	useEffect(() => {
		if (!file) {
			setPreview(currentImage);
			return;
		}

		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [file, currentImage]);



	return (

		<div className={styles.formGroup}>

			<label htmlFor="avatar">
				{
					avatarPreview
						? (
							<img
								className={styles.avatarPreview}
								src={avatarPreview}
								alt="Avatar"
							/>
						)
						: (
							<div className={styles.avatarPlaceholder}>
								<span className={styles.avatarIcon}>👤</span>
								<small>Seleccionar avatar</small>
							</div>
						)
				}

			</label>

			<input
				id="avatar"
				type="file"
				hidden
				accept="image/png,image/jpeg,image/webp,image/jpg"
				onChange={onChange}
			/>

		</div>

	);

}