import styles from './FiltrosOfertasContainer.module.css'
import ApdCheckboxFilterGroup from "../../../common/ApdCheckboxFilterGroup/ApdCheckboxFilterGroup";
import ApdRadioFilterGroup from "../../../common/ApdRadioFilterGroup/ApdRadioFilterGroup";
import ApdComboBox from "../../../common/ApdComboBox/ApdComboBox";
import ApdH3 from "../../../common/ApdH3/ApdH3";
import ApdContainer from '../../../common/ApdContainer/ApdContainer';
import ApdForm from '../../../common/ApdForm/ApdForm';


export default function FiltrosOfertasContainer({
	filtros,
	setFiltros
}) {
	function manejarCambio(evento) {
		const { name, value } = evento.target
		setFiltros({
			...filtros,
			[name]: value
		})
	}
	return <ApdForm>
		<ApdContainer direction="row" wrap="wrap" gap="2rem">
			<ApdCheckboxFilterGroup
				widgetLabel="Estados:"
				name="estados"
				value={filtros.estados}
				onChange={manejarCambio}
				options={ESTADOS}
			/>
			<ApdCheckboxFilterGroup
				widgetLabel="Distritos:"
				name="distritos"
				value={filtros.distritos}
				onChange={manejarCambio}
				options={DISTRITOS}
			/>
			<ApdCheckboxFilterGroup
				widgetLabel="Turnos:"
				name="turnos"
				value={filtros.turnos}
				onChange={manejarCambio}
				options={TURNOS}
			/>
			<ApdCheckboxFilterGroup
				widgetLabel="Niveles:"
				name="niveles"
				value={filtros.niveles}
				onChange={manejarCambio}
				options={NIVELES}
			/>

			<ApdCheckboxFilterGroup
				widgetLabel="Cargos:"
				name="cargos"
				value={filtros.cargos}
				onChange={manejarCambio}
				options={CARGOS}
			/>
		</ApdContainer>


	</ApdForm>
}



const CARGOS = [
	{
		label: "Encargados de Medios de Apoyo Técnico-Pedagógico",
		value: "EMATP",
	},
	{
		label: "Biologia",
		value: "BIOLOGIA (BLG)",
	},
	{
		label: "Escuela de verano GUARDAVIDA",
		value: "Escuela de verano GUARDAVIDA (VGU)",
	},
	{
		label: "Ciencias Sociales",
		value: "CSS",
	},
	{
		label: "Trabajo y ciudadanía",
		value: "TRABAJO Y CIUDADAN�A (TYC)",
	},
	{
		label: "Bibliotecario",
		value: "Bibliotecario",
	},
];


const DISTRITOS = [
	{
		label: "La Matanza",
		value: "LA MATANZA",
	},
	{
		label: "Moreno",
		value: "MORENO",
	},
	{
		label: "Moron",
		value: "MORON",
	},
	{
		label: "Ituzaingó",
		value: "ITUZAINGO",
	},
	{
		label: "Merlo",
		value: "MERLO",
	},
];

const ESTADOS = [
	{
		label: "Publicada",
		value: "Publicada",
		className: styles.publicada
	},
	{
		label: "Anulada",
		value: "Anulada",
		className: styles.anulada
	},
	{
		label: "Designada",
		value: "Designada",
		className: styles.designada
	}
]

const TURNOS = [
	{
		label: "Mañana",
		value: "M",
		className: styles.mañana
	},
	{
		label: "Tarde",
		value: "T",
		className: styles.tarde
	},
	{
		label: "Vespertino",
		value: "V",
		className: styles.vespertino
	}
]
const NIVELES = [
	{
		label: "Inicial",
		value: "INICIAL",
		// className: styles.jardin
	},
	{
		label: "Primaria",
		value: "PRIMARIA",
		// className: styles.primaria
	},
	{
		label: "Secundaria Adultos",
		value: "SECUNDARIA ADULTOS",
		// className: styles.secundaria
	},
	{
		label: "Tecnico Profesional",
		value: "TECNICO PROFESIONAL",
		// className: styles.secundaria
	},
	{
		label: "Superior",
		value: "SUPERIOR",
		// className: styles.terciario
	},
	{
		label: "Especial",
		value: "ESPECIAL",
		// className: styles.secundaria
	}
]