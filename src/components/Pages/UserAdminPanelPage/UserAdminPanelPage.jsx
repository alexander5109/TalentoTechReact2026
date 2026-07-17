import ApdSection from "../../common/ApdSection/ApdSection";
import ApdLabelH3 from "../../common/ApdLabelH3/ApdLabelH3";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import ApdDetailItem from "../../common/ApdDetailItem/ApdDetailItem"
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdGrilla from "../../common/ApdGrilla/ApdGrilla";
import ApdDetailHeader from "../../common/ApdDetailHeader/ApdDetailHeader";
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
		["Alertas extendidas", "Límite de alertas11", 30],
		["Alertas extendidas22", "Límite de alertas2", 30],
		["Alertas extendidas33", "Límite de alertas2", 30],
		["Alertas extendidas44", "Límite de alertas33", 30],
		["Alertas extendidas55", "Límite de alertas44", 30],
		["Alertas extendidas66", "Límite de alertas55", 30],
	];

	// relleno: stat, value
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
			<ApdSection>
				<ApdLabelH3 upper="Panel de administración" lower="Estadísticas generales" />

				<ApdPrettyP>
					Este panel reúne información general sobre el uso de la
					plataforma. En futuras versiones permitirá administrar
					usuarios, perfiles de búsqueda y alertas.
				</ApdPrettyP>
				<ApdGrilla>
					{estadisticas.map(([header, value]) => (
						<ApdDetailItem key={header}>
							<ApdDetailHeader>
								{header}
							</ApdDetailHeader>
							<p className={styles.bigNumber}>
								{value}
							</p>
						</ApdDetailItem>

					))}
				</ApdGrilla>
			</ApdSection>


			<ApdSection>
				<ApdLabelH3 upper="Gestión comercial" lower="Promociones" />

				<ApdGrilla>
					{features.map(([promotionName, feature, duration]) => (
						<ApdDetailItem key={promotionName}>
							<ApdDetailHeader>
								{promotionName}
							</ApdDetailHeader>
							<ApdPrettyP>{feature}</ApdPrettyP>
							<p className={styles.bigNumber}>
								{duration} días
							</p>
							<div style={{
								display: "flex",
								flexDirection: "row",
								margin: "1rem",
								gap: "1.5rem",
								flexShrink: 0,
							}}>
								<ApdButton variant="secondary">
									Editar
								</ApdButton>
								<ApdButton variant="danger">
									Desactivar
								</ApdButton>
							</div>
						</ApdDetailItem>

					))}
				</ApdGrilla>
				<ApdButton>
					Nueva promoción
				</ApdButton>

			</ApdSection >
		</>
	);
}