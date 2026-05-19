import Encabezado1 from './components/Encabezado1'
import ContenidoEncuadrado from './components/ContenidoEncuadrado'
import TarjetaOferta from './components/TarjetaOferta'
import ofertas from "./data/ofertas.json"

import './App.css'

function App() {

  return (
    <div>
      <Encabezado1 content="¡Bienvenido al buscador de actos publicos!"> </Encabezado1>

      <ContenidoEncuadrado>
      <p> Like the zulus they had spears and bows and arrows</p>
      </ContenidoEncuadrado>

		<div>
			{ofertas.map(oferta => (
				<TarjetaOferta
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</div>
    
    </div>
  )
}

export default App
