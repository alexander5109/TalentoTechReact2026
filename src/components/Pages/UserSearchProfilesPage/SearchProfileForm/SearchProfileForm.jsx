import styles from "./SearchProfileForm.module.css"
import CargosSelector from "./CargosSelector"
import DistritosSelector from "./DistritosSelector"
import EscuelasSelector from "./EscuelasSelector"
import NivelesSelector from "./NivelesSelector"
import PrettyText from "../../../common/PrettyText/PrettyText";

const CARGOS = [
	"MG",
	"PR",
	"EMATP",
	"Bibliotecario",
	"Preceptor",
	"Historia",
	"Ciencias Sociales",
	"Trabajo y ciudadanía",
];
const DISTRITOS = [
	"La Matanza",
	"Avellaneda",
	"Lanús",
	"Quilmes",
	"Lomas de Zamora",
	"Morón"
];

const NIVELES = [
	"Inicial",
	"Primaria",
	"Secundaria",
	"Especial",
	"Adultos"
];

export default function SearchProfileForm({ profile, onChange }) {
	return <form className={styles.form} >
		<PrettyText>
			Configurar perfil.
		</PrettyText>
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