import TextContainer from "../../common/TextContainer/TextContainer";
import SectionTitleH3 from "../../common/SectionTitleH3/SectionTitleH3";
import PrettyText from "../../common/PrettyText/PrettyText";

import styles from "./ContactoPage.module.css"
import Swal from "sweetalert2"
import APDButton from "../../common/APDButton/APDButton";

export default function ContactoPage() {

	function manejarSubmit(e) {
		e.preventDefault()
		Swal.fire({
			title: "Mensaje enviado",
			text:
				`Mentira. No se envió nada. \n Salu2`,
			icon: "success",
			timer: 1000,
			showConfirmButton: false,
			toast: true,
			position: "center"
		})
	}

	return (
		<>
			<TextContainer>

				<SectionTitleH3
					upper="Contacto"
					lower="Realiza tu consulta"
				/>

				<PrettyText>
					Este proyecto se encuentra en desarrollo
					constante y toda devolución resulta útil
					para seguir mejorándolo. Si deseas realizar
					una consulta, reportar un problema,
					proponer una idea o simplemente compartir
					tu experiencia utilizando APD Finder,
					puedes hacerlo a través del siguiente
					formulario.
				</PrettyText>

				<PrettyText>
					El objetivo de esta herramienta es ayudar
					a docentes a encontrar cargos de forma
					más cómoda y eficiente, por lo que las
					opiniones y sugerencias de la comunidad
					resultan especialmente valiosas.
				</PrettyText>

				<form
					className={styles.form}
					onSubmit={manejarSubmit}
				>

					<div className={styles.field}>
						<label>Nombre</label>

						<input
							type="text"
							placeholder="Tu nombre"
						/>
					</div>


					<div className={styles.field}>
						<label>Email</label>

						<input
							type="email"
							placeholder="tuemail@gmail.com"
						/>
					</div>


					<div className={styles.field}>
						<label>Mensaje</label>

						<textarea
							rows="6"
							placeholder="Escribe tu mensaje..."
						/>
					</div>
					<APDButton type="submit">Enviar mensaje</APDButton>

				</form>

			</TextContainer>
		</>
	)
}