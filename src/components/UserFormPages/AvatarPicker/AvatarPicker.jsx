import { useEffect, useState } from "react";
import styles from "./AvatarPicker.module.css";

export default function AvatarPicker({ archivo, onChange }) {

	const [avatarPreview, setAvatarPreview] = useState(null);

	useEffect(() => {

		if (!archivo) {
			setAvatarPreview(null);
			return;
		}

		const preview = URL.createObjectURL(archivo);

		setAvatarPreview(preview);

		return () => URL.revokeObjectURL(preview);

	}, [archivo]);

	return (

		<div className={styles.formGroup}>

			<label htmlFor="avatar">

				{
					avatarPreview
						? (
							<img
								className={styles.avatarPreview}
								src={avatarPreview}
								alt="Vista previa"
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