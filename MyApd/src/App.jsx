import Encabezado1 from './components/Encabezado1'
import Encabezado2 from './components/Encabezado2'
import LayoutGeneral from './components/LayoutGeneral'
import OfertaListContainer from './components/OfertaListContainer/OfertaListContainer'

import './App.css'

function App() {

	return (
		<>
			<LayoutGeneral>
				<Encabezado1>Home</Encabezado1>
				<Encabezado2>"Like the zulus they had spears and bows and arrows"</Encabezado2>

				<OfertaListContainer mensaje="Ofertas disponibles"> </OfertaListContainer>
			</LayoutGeneral>
		</>
	)
}

export default App
