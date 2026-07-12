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

export default function SearchProfileForm({
	selectedProfile,
	updateSelectedProfile
}) {
	return <form className={styles.form} >
		<PrettyText>
			Configurar perfil.
		</PrettyText>
		<input
			className={styles.profileName}
			value={selectedProfile.nombre}
			onChange={(e) =>
				updateSelectedProfile({
					nombre: e.target.value
				})
			}
		/>
		<DistritosSelector
			opciones={DISTRITOS}
			selected={selectedProfile.distritos}
			onChange={(newDistritos) =>
				updateSelectedProfile({
					distritos: newDistritos
				})
			}
		/>
		<NivelesSelector
			opciones={NIVELES}
			selected={selectedProfile.niveles}
			onChange={(newNiveles) =>
				updateSelectedProfile({
					niveles: newNiveles
				})
			}
		/>
		<CargosSelector
			opciones={CARGOS}
			selected={selectedProfile.cargos}
			onChange={(newCargos) =>
				updateSelectedProfile({
					cargos: newCargos
				})
			}
		/>
		<EscuelasSelector
			schools={selectedProfile.escuelas}
			onChange={(newEscuelas) =>
				updateSelectedProfile({
					escuelas: newEscuelas
				})
			}
		/>
	</form>

}