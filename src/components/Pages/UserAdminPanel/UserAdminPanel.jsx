import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";

import styles from "./UserAdminPanel.module.css";

export default function UserAdminPanel() {
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

				<div className={styles.card}>
					<h3>👥 Usuarios registrados</h3>
					<p className={styles.value}>128</p>
				</div>

				<div className={styles.card}>
					<h3>📁 Perfiles de búsqueda</h3>
					<p className={styles.value}>354</p>
				</div>

				<div className={styles.card}>
					<h3>🔔 Alertas activas</h3>
					<p className={styles.value}>91</p>
				</div>

				<div className={styles.card}>
					<h3>📄 Postulaciones guardadas</h3>
					<p className={styles.value}>2.184</p>
				</div>

			</div>

			<section className={styles.section}>

				<h3>Funciones previstas</h3>

				<ul>
					<li>Administrar usuarios.</li>
					<li>Visualizar perfiles de búsqueda.</li>
					<li>Gestionar alertas automáticas.</li>
					<li>Consultar estadísticas de utilización.</li>
					<li>Analizar distritos, cargos y niveles más buscados.</li>
				</ul>

			</section>

		</TextContainer>
	);
}