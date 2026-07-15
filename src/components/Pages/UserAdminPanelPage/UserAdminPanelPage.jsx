import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import APDCardInfo from "../../common/APDCardInfo/APDCardInfo"
import APDCardPromotion from "../../common/APDCardPromotion/APDCardPromotion"
import APDPanel from "../../common/APDPanel/APDPanel"
import APDButton from "../../common/APDButton/APDButton";
import APDGrilla from "../../common/APDGrilla/APDGrilla";

export default function UserAdminPanelPage() {
	return (
		<TextContainer>
			<SectionTitleH3
				upper="Gestión comercial"
				lower="Promociones"
			/>

			<APDButton>
				Nueva promoción
			</APDButton>


			<APDGrilla>

				<APDCardPromotion
					name="Alertas extendidas"
					type="Límite de alertas"
					duration="30 días"
				/>

			</APDGrilla>


			<SectionTitleH3
				upper="Panel de administración"
				lower="Estadísticas generales"
			/>

			<PrettyText>
				Este panel reúne información general sobre el uso de la
				plataforma. En futuras versiones permitirá administrar
				usuarios, perfiles de búsqueda y alertas.
			</PrettyText>

			<APDGrilla>

				<APDCardInfo
					icon="👥"
					title="Usuarios registrados"
					value="128"
				/>

				<APDCardInfo
					icon="📁"
					title="Perfiles de búsqueda"
					value="354"
				/>

				<APDCardInfo
					icon="🔔"
					title="Alertas activas"
					value="91"
				/>

				<APDCardInfo
					icon="📄"
					title="Postulaciones guardadas"
					value="2.184"
				/>

			</APDGrilla>

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