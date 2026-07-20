import ApdPrettyP from "./../../common/ApdPrettyP/ApdPrettyP"
import ApdH3TitleSubtitle from "./../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle"
import ApdPanel from "../../common/ApdPanel/ApdPanel"

export default function AboutPage() {
	return <ApdPanel>
		<ApdH3TitleSubtitle upper="Sobre el proyecto" lower="¿Quienes Somos?" />

		<ApdPrettyP>
			Mi nombre es Alexander Seling, soy de La Matanza, Buenos Aires.
			<br></br>
			Soy profesor de historia y técnico en programación.
			<br></br>
			Trabajo principalmente con Python, PyQt6 y C#, con foco en backend y aplicaciones de escritorio.
			<br></br>
			Actualmente me encuentro aprendiendo frontend moderno con React.
		</ApdPrettyP>

		<ApdPrettyP>
			Apd Finder nace de una necesidad concreta
			observada dentro del ámbito educativo:
			simplificar la búsqueda diaria de cargos y
			hacer más accesible la información para los
			docentes.
		</ApdPrettyP>
	</ApdPanel >
}