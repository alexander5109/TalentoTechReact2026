import LayoutGeneral from './components/layout/LayoutGeneral'
// import HomePage from './components/HomePage/HomePage'
import OfertasPage from './components/OfertasPage/OfertasPage'

import './App.css'

export default function App() {
	return (
		<LayoutGeneral>
			{/* <HomePage /> */}
			<OfertasPage />
		</LayoutGeneral>
	)
}