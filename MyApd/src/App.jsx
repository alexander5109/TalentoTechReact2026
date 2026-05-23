import LayoutGeneral from './components/LayoutGeneral'

import HomePage from './pages/HomePage'

import './App.css'
import OfertasPage from './pages/OfertasPage'

function App() {
	return (
		<LayoutGeneral>
			{/* <HomePage /> */}
			<OfertasPage />
		</LayoutGeneral>
	)
}

export default App