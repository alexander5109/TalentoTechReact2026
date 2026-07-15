import APDSection from "../../common/APDSection/APDSection";
import APDLabelH3 from "../../common/APDLabelH3/APDLabelH3";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";

import styles from "./ContactoPage.module.css"
import Swal from "sweetalert2"
import APDButton from "../../common/APDButton/APDButton";
import APDFormField from "../../common/APDFormField/APDFormField";
import APDForm from "../../common/APDForm/APDForm";
import APDInput from "../../common/APDInput/APDInput";

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
			<APDSection>

				<APDLabelH3 upper="Contacto" lower="Realiza tu consulta"
				/>

				<ApdPrettyP>
					Este proyecto se encuentra en desarrollo
					constante y toda devolución resulta útil
					para seguir mejorándolo. Si deseas realizar
					una consulta, reportar un problema,
					proponer una idea o simplemente compartir
					tu experiencia utilizando APD Finder,
					puedes hacerlo a través del siguiente
					formulario.
				</ApdPrettyP>

				<ApdPrettyP>
					El objetivo de esta herramienta es ayudar
					a docentes a encontrar cargos de forma
					más cómoda y eficiente, por lo que las
					opiniones y sugerencias de la comunidad
					resultan especialmente valiosas.
				</ApdPrettyP>


				<APDForm onSubmit={manejarSubmit}>

					<APDFormField
						label="Nombre"
						htmlFor="nombre"
					>

						<APDInput
							id="nombre"
							placeholder="Tu nombre"
						/>

					</APDFormField>

					<APDFormField
						label="Email"
						htmlFor="email"
					>

						<APDInput
							id="email"
							type="email"
							placeholder="tuemail@gmail.com"
						/>

					</APDFormField>

					<APDFormField
						label="Mensaje"
						htmlFor="mensaje"
					>

						<APDInput
							as="textarea"
							id="mensaje"
							rows={6}
							placeholder="Escribe tu mensaje..."
						/>

					</APDFormField>

					<APDButton type="submit">
						Enviar mensaje
					</APDButton>

				</APDForm>


			</APDSection>
		</>
	)
}