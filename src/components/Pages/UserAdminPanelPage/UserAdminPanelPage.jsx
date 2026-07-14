import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import APDDataCard from "../../common/APDDataCard/APDDataCard"
import APDPanel from "../../common/APDPanel/APDPanel"
import styles from "./UserAdminPanelPage.module.css";

export default function UserAdminPanelPage() {
	return (
		<TextContainer>

			<SectionTitleH3
				upper="Panel de administración"
				lower="Estadísticas generales"
			/>

			<PrettyText>
				Este panel reúne información general sobre el uso de la
				plataforma. En futuras versiones permitirá administrar
				usuarios, perfiles de búsqueda y alertas.
			</PrettyText>

			<div className={styles.grid}>

				<APDDataCard
					icon="👥"
					title="Usuarios registrados"
					value="128"
				/>

				<APDDataCard
					icon="📁"
					title="Perfiles de búsqueda"
					value="354"
				/>

				<APDDataCard
					icon="🔔"
					title="Alertas activas"
					value="91"
				/>

				<APDDataCard
					icon="📄"
					title="Postulaciones guardadas"
					value="2.184"
				/>

			</div>

			<APDPanel>

				<h3>Funciones previstas</h3>

				<ul>
					<li>Administrar usuarios.</li>
					<li>Visualizar perfiles de búsqueda.</li>
					<li>Gestionar alertas automáticas.</li>
					<li>Consultar estadísticas de utilización.</li>
					<li>Analizar distritos, cargos y niveles más buscados.</li>
				</ul>

			</APDPanel>

		</TextContainer>
	);
}