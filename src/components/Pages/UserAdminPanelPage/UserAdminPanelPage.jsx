import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";
import APDDetailItem from "../../common/APDDetailItem/APDDetailItem"
import APDButton from "../../common/APDButton/APDButton";
import APDGrilla from "../../common/APDGrilla/APDGrilla";
import APDDetailHeader from "../../common/APDDetailHeader/APDDetailHeader";
import styles from "./UserAdminPanelPage.module.css";


const PROMOTION_TYPES = {
	ALERT_LIMIT: "Más alertas",
	PROFILE_FEATURE: "Perfil destacado",
	SAVED_POSTS_LIMIT: "Más postulaciones guardadas"
}
function puedeCrearAlerta(usuario) {

	if (usuario.promociones.includes("ALERT_LIMIT"))
		return usuario.alertas < 5;

	return usuario.alertas < 1;
}

export default function UserAdminPanelPage() {

	// feature: nombre promocion, feature, duration
	const features = [
		["Alertas extendidas", "Límite de alertas", 30],
		["Alertas extendidas", "Límite de alertas", 30],
		["Alertas extendidas", "Límite de alertas", 30],
		["Alertas extendidas", "Límite de alertas", 30],
		["Alertas extendidas", "Límite de alertas", 30],
		["Alertas extendidas", "Límite de alertas", 30],
	];

	const estadisticas = [
		["👥 Usuarios registrados", 128],
		["🔔 Alertas activas", 91],
		["📄 Postulaciones guardadas", "2.184"],
		["📁 Perfiles de búsqueda", 354],
		["📊 Peticiones por minuto", 5354],
		["💸 Cupones aplicados", 63],
	];

	return (
		<>

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
				<APDGrilla>
					{estadisticas.map(([header, value]) => (
						<APDDetailItem key={header}>
							<APDDetailHeader>
								{header}
							</APDDetailHeader>
							<p className={styles.bigNumber}>
								{value}
							</p>
						</APDDetailItem>

					))}
				</APDGrilla>
			</TextContainer>


			<TextContainer>
				<SectionTitleH3
					upper="Gestión comercial"
					lower="Promociones"
				/>

				<APDGrilla>
					{features.map(([promotionName, feature, duration]) => (
						<APDDetailItem key={promotionName}>
							<APDDetailHeader>
								{promotionName}
							</APDDetailHeader>
							<PrettyText>{feature}</PrettyText>
							<p className={styles.bigNumber}>
								{duration} días
							</p>
							<p><APDButton variant="secondary">
								Editar
							</APDButton></p>
							<p>
								<APDButton variant="danger">
									Desactivar
								</APDButton>
							</p>
						</APDDetailItem>

					))}
				</APDGrilla>
				<APDButton>
					Nueva promoción
				</APDButton>

			</TextContainer>
		</>
	);
}