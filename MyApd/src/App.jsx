import { Routes, Route } from "react-router-dom"
import LayoutGeneral from './components/LayoutGeneral'
import HomePage from './components/HomePage/HomePage'
import OfertasPage from './components/OfertasPage/OfertasPage'
import AboutPage from './components/AboutPage/AboutPage'
import ContactoPage from './components/ContactoPage/ContactoPage'
import MiPerfilPage from './components/MiPerfilPage/MiPerfilPage'
import OfertaDetallePage from './components/OfertaDetallePage/OfertaDetallePage'
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
			</Route>
		</Routes>
	)
}