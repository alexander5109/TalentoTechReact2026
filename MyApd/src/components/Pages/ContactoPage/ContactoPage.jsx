
import PageSection from "../../common/PageSection/PageSection"

import styles from "./ContactoPage.module.css"

export default function ContactoPage() {
	function manejarSubmit(e) {
		e.preventDefault()
		alert("Mensaje enviado")
	}

	return (
		<>
			<h1>Contacto</h1>

			<PageSection>

				<form
					className={styles.form}
					onSubmit={manejarSubmit}
				>

					<label>Nombre</label>
					<input
						type="text"
						placeholder="Tu nombre"
					/>

					<label>Email</label>
					<input
						type="email"
						placeholder="tuemail@gmail.com"
					/>

					<label>Mensaje</label>
					<textarea
						rows="6"
						placeholder="Escribe tu mensaje..."
					/>

					<button type="submit">
						Enviar mensaje
					</button>

				</form>

			</PageSection>
		</>
	)
}