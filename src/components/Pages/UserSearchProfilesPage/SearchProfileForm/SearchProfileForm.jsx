import styles from "./SearchProfileForm.module.css"
import CargosSelector from "./CargosSelector"
import DistritosSelector from "./DistritosSelector"
import EscuelasSelector from "./EscuelasSelector"
import NivelesSelector from "./NivelesSelector"
import ApdPrettyP from "../../../common/ApdPrettyP/ApdPrettyP";


export default function SearchProfileForm({ profile, onChange }) {
	return <form className={styles.form} >
		<ApdPrettyP>
			Configurar perfil.
		</ApdPrettyP>
		<input
			className={styles.profileName}
			value={profile.nombre}
			onChange={(e) =>
				onChange({
					nombre: e.target.value
				})
			}
		/>
		<DistritosSelector
			opciones={DISTRITOS}
			selected={profile.distritos}
			onChange={(newDistritos) =>
				onChange({
					distritos: newDistritos
				})
			}
		/>
		<NivelesSelector
			opciones={NIVELES}
			selected={profile.niveles}
			onChange={(newNiveles) =>
				onChange({
					niveles: newNiveles
				})
			}
		/>
		<CargosSelector
			opciones={CARGOS}
			selected={profile.cargos}
			onChange={(newCargos) =>
				onChange({
					cargos: newCargos
				})
			}
		/>
		<EscuelasSelector
			schools={profile.escuelas}
			onChange={(newEscuelas) =>
				onChange({
					escuelas: newEscuelas
				})
			}
		/>
	</form>

}