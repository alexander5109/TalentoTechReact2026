import ApdSection from "../../common/ApdSection/ApdSection";
import ApdLabelH3 from "../../common/ApdLabelH3/ApdLabelH3";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import ApdDetailItem from "../../common/ApdDetailItem/ApdDetailItem"
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdGrilla from "../../common/ApdGrilla/ApdGrilla";
import ApdDetailHeader from "../../common/ApdDetailHeader/ApdDetailHeader";
import styles from "./UserAdminPanelPage.module.css";
import { useEffect, useState } from "react";
import { getPromotions } from "../../../firebase/promotionsService";

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
	const featureNames = {
		alerts_3: "Hasta 3 alertas",
		remove_ads: "Sin publicidad",
		school_map: "Mapa de establecimientos",
		mobile_notifications: "Notificaciones móviles"
	};
	const [promotions, setPromotions] = useState([]);

	async function refreshPromotions() {
		const data = await getPromotions();
		setPromotions(data);
	}

	useEffect(() => { refreshPromotions(); }, []);




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

					{promotions.map(promotion => (

						<ApdDetailItem key={promotion.id}>

							<ApdDetailHeader>
								🎁 {promotion.nombre}
							</ApdDetailHeader>

							<ApdPrettyP>
								{promotion.descripcion}
							</ApdPrettyP>

							<p>
								<strong>Código:</strong> {promotion.codigo}
							</p>

							<p>
								<strong>Duración:</strong> {promotion.duracionDias} días
							</p>

							<p>
								<strong>Estado:</strong>{" "}
								{promotion.activa ? "🟢 Activa" : "⚫ Desactivada"}
							</p>

							<p>
								<strong>Incluye:</strong>
							</p>

							<ul>
								{promotion.features?.map(feature => (
									<li key={feature}>
										{featureNames[feature] ?? feature}
									</li>
								))}
							</ul>

							<div className={styles.actions}>

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