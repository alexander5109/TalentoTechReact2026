import PrettyText from "../../common/PrettyText/PrettyText"
import SectionTitle from "../../common/SectionTitle/SectionTitle"
import TextContainer from "../../common/TextContainer/TextContainer"

export default function AboutPage() {
	return (
		<TextContainer>
			<SectionTitle
				upper="Sobre el proyecto"
				lower="¿Quienes Somos?"
			/>
			<PrettyText>
				Soy Alexander Seling,
				profesor de historia y técnico en programación.
				<br></br>
				Trabajo principalmente con
				Python, PyQt6 y C#, con foco en backend y aplicaciones de escritorio.
				<br></br>
				Actualmente me encuentro
				aprendiendo frontend moderno
				con React.
			</PrettyText>
		</TextContainer>
	)
}