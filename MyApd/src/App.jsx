import Encabezado1 from './components/Encabezado1'
import Encabezado2 from './components/Encabezado2'
import Header from './components/Header'
import Footer from './components/Footer'
import ContenedorOfertas from './components/ContenedorOfertas'
import ofertas from "./data/ofertas.json"

import './App.css'

function App() {

	return (
		<>
			<Header></Header>
			<Encabezado1>Home</Encabezado1>
			<Encabezado2>"Like the zulus they had spears and bows and arrows"</Encabezado2>

			<ContenedorOfertas ofertas={ofertas}> </ContenedorOfertas>
			<Footer></Footer>
		</>
	)
}

export default App
