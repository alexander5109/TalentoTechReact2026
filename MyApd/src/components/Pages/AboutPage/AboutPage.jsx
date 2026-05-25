import PrettyText from "../../common/PrettyText/PrettyText"
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3"
import TextContainer from "../../common/TextContainer/TextContainer"

export default function AboutPage() {
	return (
		<>
			<TextContainer>
				<SectionTitleH3
					upper="Sobre el proyecto"
					lower="¿Quienes Somos?"
				/>

				<PrettyText>
					Mi nombre es Alexander Seling, soy de La Matanza, Buenos Aires.
					<br></br>
					Soy profesor de historia y técnico en programación.
					<br></br>
					Trabajo principalmente con Python, PyQt6 y C#, con foco en backend y aplicaciones de escritorio.
					<br></br>
					Actualmente me encuentro aprendiendo frontend moderno con React.
				</PrettyText>

				<PrettyText>
					APD Finder nace de una necesidad concreta
					observada dentro del ámbito educativo:
					simplificar la búsqueda diaria de cargos y
					hacer más accesible la información para los
					docentes.
				</PrettyText>
			</TextContainer >
		</>
	)
}