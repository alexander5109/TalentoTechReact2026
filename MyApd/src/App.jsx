import { Routes, Route } from "react-router-dom"
import LayoutGeneral from './components/LayoutGeneral'
import HomePage from './components/Pages/HomePage/HomePage'
import OfertasPage from './components/Pages/OfertasPage/OfertasPage'
import AboutPage from './components/Pages/AboutPage/AboutPage'
import ContactoPage from './components/Pages/ContactoPage/ContactoPage'
import MiPerfilPage from './components/Pages/MiPerfilPage/MiPerfilPage'
import PendingPostulationsPage from './components/Pages/PendingPostulationsPage/PendingPostulationsPage'
import OfertaDetallePage from './components/Pages/OfertaDetallePage/OfertaDetallePage'
import './App.css'

export default function App() {
	return (
		<Routes>
			<Route element={<LayoutGeneral />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/ofertas" element={<OfertasPage />} />
				<Route path="/ofertas/:idOferta" element={<OfertaDetallePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contacto" element={<ContactoPage />} />
				<Route path="/miPerfil" element={<MiPerfilPage />} />
				<Route path="/pendingPostulations" element={<PendingPostulationsPage />} />
			</Route>
		</Routes>
	)
}