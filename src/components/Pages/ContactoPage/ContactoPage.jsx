import ApdSection from "../../common/ApdSection/ApdSection";
import ApdLabelH3 from "../../common/ApdLabelH3/ApdLabelH3";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";

import Swal from "sweetalert2"
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdFormField from "../../common/ApdFormField/ApdFormField";
import ApdForm from "../../common/ApdForm/ApdForm";
import ApdInput from "../../common/ApdInput/ApdInput";

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
			<ApdSection>

				<ApdLabelH3 upper="Contacto" lower="Realiza tu consulta"
				/>

				<ApdPrettyP>
					Este proyecto se encuentra en desarrollo
					constante y toda devolución resulta útil
					para seguir mejorándolo. Si deseas realizar
					una consulta, reportar un problema,
					proponer una idea o simplemente compartir
					tu experiencia utilizando Apd Finder,
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


				<ApdForm onSubmit={manejarSubmit}>

					<ApdFormField
						label="Nombre"
						htmlFor="nombre"
					>

						<ApdInput
							id="nombre"
							placeholder="Tu nombre"
						/>

					</ApdFormField>

					<ApdFormField
						label="Email"
						htmlFor="email"
					>

						<ApdInput
							id="email"
							type="email"
							placeholder="tuemail@gmail.com"
						/>

					</ApdFormField>

					<ApdFormField
						label="Mensaje"
						htmlFor="mensaje"
					>

						<ApdInput
							as="textarea"
							id="mensaje"
							rows={6}
							placeholder="Escribe tu mensaje..."
						/>

					</ApdFormField>

					<ApdButton type="submit">
						Enviar mensaje
					</ApdButton>

				</ApdForm>


			</ApdSection>
		</>
	)
}