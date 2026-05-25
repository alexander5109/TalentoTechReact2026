import PrettyText from "../../common/PrettyText/PrettyText";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import TextContainerConImage from "../../common/TextContainerConImage/TextContainerConImage";

export default function HomePage() {
	return (
		<>
			<TextContainerConImage
				image="/images/apd1.jpg"
				imageSide="left"
			>
				<SectionTitleH3
					upper="Contexto"
					lower="¿Qué son los APD?"
				/>

				<PrettyText>
					Los Actos Públicos Digitales (APD) son el
					sistema implementado por la Dirección
					General de Cultura y Educación de la
					provincia de Buenos Aires para la
					publicación y asignación de cargos
					docentes de manera virtual.
				</PrettyText>

				<PrettyText>
					A través de la plataforma oficial, los
					docentes pueden consultar ofertas,
					postularse y realizar seguimiento de cargos
					disponibles según su formación, puntaje y
					situación laboral.
				</PrettyText>
			</TextContainerConImage>


			<TextContainerConImage
				image="/images/apd2.jpg"
				imageSide="right"
			>
				<SectionTitleH3
					upper="La dificultad"
					lower="Un sistema útil, pero muy tedioso"
				/>

				<PrettyText>
					Aunque el sistema oficial funciona
					correctamente, la búsqueda diaria de cargos
					suele resultar lenta y repetitiva. Muchas
					veces es necesario volver a cargar filtros,
					distritos, materias y horarios cada vez que
					se realiza una consulta.
				</PrettyText>

				<PrettyText>
					Además, un mismo docente puede estar
					habilitado para varias materias distintas, lo
					que obliga a realizar múltiples búsquedas por
					separado. También es importante revisar
					incompatibilidades horarias y verificar si ya
					existen postulantes con mayor puntaje para
					evaluar si una oferta realmente resulta
					conveniente.
				</PrettyText>
			</TextContainerConImage>


			<TextContainerConImage
				image="/images/apd3.png"
				imageSide="left"
			>
				<SectionTitleH3
					upper="Objetivo"
					lower="¿Qué busca resolver APD Finder?"
				/>

				<PrettyText>
					APD Finder nace como una herramienta
					complementaria pensada específicamente
					para docentes. El objetivo principal es hacer
					más cómoda y eficiente la búsqueda de
					Actos Públicos Digitales mediante filtros
					personalizados y configuraciones adaptadas
					a cada usuario.
				</PrettyText>

				<PrettyText>
					La aplicación permite crear perfiles de
					búsqueda basados en oblea, títulos o áreas
					de incumbencia, además de configurar
					horarios y cargos incompatibles para reducir
					la cantidad de resultados irrelevantes.
				</PrettyText>

				<PrettyText>
					A futuro, también se planea incorporar un
					sistema de notificaciones para avisar cuando
					aparezcan cargos compatibles con el perfil
					del docente.
				</PrettyText>
			</TextContainerConImage>
		</>
	)
}