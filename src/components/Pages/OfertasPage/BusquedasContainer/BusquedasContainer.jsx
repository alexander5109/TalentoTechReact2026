import ApdButton from "../../../common/ApdButton/ApdButton";
import ApdComboBox from "../../../common/ApdComboBox/ApdComboBox";

import styles from "./BusquedasContainer.module.css";


export default function BusquedasContainer({

	profiles = [],

	selectedProfileId,

	onSelectProfile,

	onSaveProfile,

	onDeleteProfile

}) {


	const profileOptions = profiles.map(profile => ({

		value: profile.id,

		label: profile.nombre

	}));


	return (

		<div className={styles.container}>


			<h3>
				🔎 Mis búsquedas
			</h3>


			<ApdComboBox

				value={selectedProfileId}

				onChange={onSelectProfile}

				options={profileOptions}

				placeholder="Seleccionar perfil"

			/>

			<>{profiles.map(profile => (
				<SearchProfileCard
					key={profile.id}
					profile={profile}
					selected={profile.id === selectedProfileId}
					onSelect={onSelectProfile}
					onDelete={onDeleteProfile}
				/>
			))
			}</>



			<ApdButton
				onClick={onSaveProfile}
			>
				🔖 Guardar perfil de búsqueda
			</ApdButton>


		</div>

	)

}