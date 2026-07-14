import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import APDAdminStatCard from "./APDAdminStatCard/APDAdminStatCard"
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

				<APDAdminStatCard
					icon="👥"
					title="Usuarios registrados"
					value="128"
				/>

				<APDAdminStatCard
					icon="📁"
					title="Perfiles de búsqueda"
					value="354"
				/>

				<APDAdminStatCard
					icon="🔔"
					title="Alertas activas"
					value="91"
				/>

				<APDAdminStatCard
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