import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdPanel from "../../common/ApdPanel/ApdPanel";

export default function HomePage() {
	return (
		<>
			<ApdPanel image={{
				src: "/images/apd1.jpg",
				alt: "Actos Publicos Digitales",
				imageSide: "left"
			}}
			>
				<ApdH3TitleSubtitle upper="Contexto" lower="¿Qué son los Apd?" />

				<ApdPrettyP>
					Los Actos Públicos Digitales (Apd) son el
					sistema implementado por la Dirección
					General de Cultura y Educación de la
					provincia de Buenos Aires para la
					publicación y asignación de cargos
					docentes de manera virtual.
				</ApdPrettyP>

				<ApdPrettyP>
					A través de la plataforma oficial, los
					docentes pueden consultar ofertas,
					postularse y realizar seguimiento de cargos
					disponibles según su formación, puntaje y
					situación laboral.
				</ApdPrettyP>
			</ApdPanel >


			<ApdPanel image={{
				src: "/images/apd2.jpg",
				alt: "Actos Publicos Digitales 2",
				imageSide: "right"
			}}
			>
				<ApdH3TitleSubtitle upper="La dificultad" lower="Un sistema útil, pero muy tedioso"
				/>

				<ApdPrettyP>
					Aunque el sistema oficial funciona
					correctamente, la búsqueda diaria de cargos
					suele resultar lenta y repetitiva. Muchas
					veces es necesario volver a cargar filtros,
					distritos, materias y horarios cada vez que
					se realiza una consulta.
				</ApdPrettyP>

				<ApdPrettyP>
					Además, un mismo docente puede estar
					habilitado para varias materias distintas, lo
					que obliga a realizar múltiples búsquedas por
					separado. También es importante revisar
					incompatibilidades horarias y verificar si ya
					existen postulantes con mayor puntaje para
					evaluar si una oferta realmente resulta
					conveniente.
				</ApdPrettyP>
			</ApdPanel>


			<ApdPanel
				image={{
					src: "/images/apd3.jpg",
					alt: "Actos Publicos Digitales 3",
					imageSide: "left"
				}}
			>
				<ApdH3TitleSubtitle upper="Objetivo" lower="¿Qué busca resolver Apd Finder?" />

				<ApdPrettyP>
					Apd Finder nace como una herramienta
					complementaria pensada específicamente
					para docentes. El objetivo principal es hacer
					más cómoda y eficiente la búsqueda de
					Actos Públicos Digitales mediante filtros
					personalizados y configuraciones adaptadas
					a cada usuario.
				</ApdPrettyP>

				<ApdPrettyP>
					La aplicación permite crear perfiles de
					búsqueda basados en oblea, títulos o áreas
					de incumbencia, además de configurar
					horarios y cargos incompatibles para reducir
					la cantidad de resultados irrelevantes.
				</ApdPrettyP>

				<ApdPrettyP>
					A futuro, también se planea incorporar un
					sistema de notificaciones para avisar cuando
					aparezcan cargos compatibles con el perfil
					del docente.
				</ApdPrettyP>
			</ApdPanel>
		</>
	)
}