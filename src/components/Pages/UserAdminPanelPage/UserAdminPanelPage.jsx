import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";
import ApdDetailItem from "../../common/ApdDetailItem/ApdDetailItem"
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdLayoutGrid from "../../common/ApdLayoutGrid/ApdLayoutGrid";
import styles from "./UserAdminPanelPage.module.css";
import { useEffect, useState } from "react";
import { getAllPromotions, getFeatures } from "../../../firebase/promotionsService";
import { Link } from "react-router-dom";
import ApdLayoutStack from "../../common/ApdLayoutStack/ApdLayoutStack";
import ApdH4 from "../../common/ApdH4/ApdH4";

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



	const [availableFeatures, setFeatures] = useState({});


	useEffect(() => {

		async function loadFeatures() {

			const data = await getFeatures();

			const featureMap = data.reduce((acc, feature) => {
				acc[feature.id] = feature;
				return acc;
			}, {});
			// alert(featureMap)
			setFeatures(featureMap);
			// alert(availableFeatures)
		}

		loadFeatures();

	}, []);


	const [promotions, setPromotions] = useState([]);

	async function refreshPromotions() {
		const data = await getAllPromotions();
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

	return <>

		<ApdPanel as="section">
			<ApdH3TitleSubtitle upper="Gestión comercial" lower="Promociones" />

			<ApdLayoutGrid>

				{promotions.map(promotion => (

					<ApdDetailItem key={promotion.id}>

						<ApdH4>
							Nombre: {promotion.nombre}
						</ApdH4>

						<ApdPrettyP>
							Descripcion: {promotion.descripcion}
						</ApdPrettyP>

						<p>
							Codigo: <strong>{promotion.codigo}</strong>
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
									{availableFeatures[feature]?.nombre ?? feature}
								</li>
							))}
						</ul>
						<ApdLayoutStack direction="row">
							<Link to={`/userAdminNewPromotion/${promotion.id}`}>
								<ApdButton variant="secondary">
									Editar
								</ApdButton>
							</Link>
						</ApdLayoutStack>
					</ApdDetailItem>

				))}

			</ApdLayoutGrid>
			<Link variant="primary" to="/userAdminNewPromotion">
				<ApdButton variant="primary" > Nueva promoción</ApdButton>
			</Link>


		</ApdPanel >


		<ApdPanel as="section">
			<ApdH3TitleSubtitle upper="Panel de administración" lower="Estadísticas generales" />

			<ApdPrettyP>
				Este panel reúne información general sobre el uso de la
				plataforma. En futuras versiones permitirá administrar
				usuarios, perfiles de búsqueda y alertas.
			</ApdPrettyP>
			<ApdLayoutGrid>
				{estadisticas.map(([header, value]) => (
					<ApdDetailItem key={header}>
						<ApdH4>
							{header}
						</ApdH4>
						<p className={styles.bigNumber}>
							{value}
						</p>
					</ApdDetailItem>

				))}
			</ApdLayoutGrid>
		</ApdPanel>

	</>
}