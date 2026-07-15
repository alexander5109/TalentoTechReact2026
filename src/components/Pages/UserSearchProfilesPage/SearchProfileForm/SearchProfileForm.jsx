import styles from "./SearchProfileForm.module.css"
import CargosSelector from "./CargosSelector"
import DistritosSelector from "./DistritosSelector"
import EscuelasSelector from "./EscuelasSelector"
import NivelesSelector from "./NivelesSelector"
import ApdPrettyP from "../../../common/ApdPrettyP/ApdPrettyP";
import APDFormField from "../../../common/APDFormField/APDFormField"
import APDForm from "../../../common/APDForm/APDForm"
import APDInput from "../../../common/APDInput/APDInput"


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
	<APDForm>

		<ApdPrettyP>
			Configurar perfil.
		</ApdPrettyP>

		<APDFormField
			label="Nombre del perfil"
			htmlFor="profileName"
		>
			<APDInput
				id="profileName"
				value={profile.nombre}
				onChange={(e) =>
					onChange({
						nombre: e.target.value
					})
				}
			/>
		</APDFormField>

		<APDFormField label="Distritos">
			<DistritosSelector
				opciones={DISTRITOS}
				selected={profile.distritos}
				onChange={(newDistritos) =>
					onChange({
						distritos: newDistritos
					})
				}
			/>
		</APDFormField>

		<APDFormField label="Niveles">
			<NivelesSelector
				opciones={NIVELES}
				selected={profile.niveles}
				onChange={(newNiveles) =>
					onChange({
						niveles: newNiveles
					})
				}
			/>
		</APDFormField>

		<APDFormField label="Cargos">
			<CargosSelector
				opciones={CARGOS}
				selected={profile.cargos}
				onChange={(newCargos) =>
					onChange({
						cargos: newCargos
					})
				}
			/>
		</APDFormField>

		<APDFormField label="Escuelas">
			<EscuelasSelector
				schools={profile.escuelas}
				onChange={(newEscuelas) =>
					onChange({
						escuelas: newEscuelas
					})
				}
			/>
		</APDFormField>

	</APDForm>

}