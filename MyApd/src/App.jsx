import Encabezado1 from './components/Encabezado1'
import Encabezado2 from './components/Encabezado2'
import ContenedorOfertas from './components/ContenedorOfertas'
import ofertas from "./data/ofertas.json"

import './App.css'

function App() {

	return (
		<div>
			<Encabezado1>"¡Bienvenido al buscador de actos publicos!"</Encabezado1>
			<Encabezado2>"Like the zulus they had spears and bows and arrows"</Encabezado2>

			<ContenedorOfertas ofertas={ofertas}> </ContenedorOfertas>
		</div>
	)
}

export default App
