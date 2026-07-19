import ApdPanel from "../../common/ApdPanel/ApdPanel";
import ApdH3TitleSubtitle from "../../common/ApdH3TitleSubtitle/ApdH3TitleSubtitle";
import ApdPrettyP from "../../common/ApdPrettyP/ApdPrettyP";

import Swal from "sweetalert2"
import ApdButton from "../../common/ApdButton/ApdButton";
import ApdForm from "../../common/ApdForm/ApdForm";
import ApdInput from "../../common/ApdInput/ApdInput";
import ApdContainer from "../../common/ApdContainer/ApdContainer";
import ApdLabel from "../../common/ApdLabel/ApdLabel";

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

	return <ApdPanel>

		<ApdH3TitleSubtitle upper="Contacto" lower="Realiza tu consulta"
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

			<ApdContainer>
				<ApdLabel htmlFor="nombre">Nombre</ApdLabel>

				<ApdInput
					id="nombre"
					placeholder="Tu nombre"
				/>
			</ApdContainer>

			<ApdContainer>
				<ApdLabel htmlFor="email">Email</ApdLabel>

				<ApdInput
					id="email"
					type="email"
					placeholder="tuemail@gmail.com"
				/>
			</ApdContainer>

			<ApdContainer>
				<ApdLabel htmlFor="mensaje">Mensaje</ApdLabel>

				<ApdInput
					as="textarea"
					id="mensaje"
					rows={6}
					placeholder="Escribe tu mensaje..."
				/>
			</ApdContainer>

			<ApdButton type="submit">
				Enviar mensaje
			</ApdButton>

		</ApdForm>


	</ApdPanel>
}