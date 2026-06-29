import { Routes, Route } from "react-router-dom"
import LayoutGeneral from './components/LayoutGeneral'
import HomePage from './components/Pages/HomePage/HomePage'
import OfertasPage from './components/Pages/OfertasPage/OfertasPage'
import AboutPage from './components/Pages/AboutPage/AboutPage'
import ContactoPage from './components/Pages/ContactoPage/ContactoPage'
import MyProfilesPage from './components/Pages/MyProfilesPage/MyProfilesPage'
import PendingPostulationsPage from './components/Pages/PendingPostulationsPage/PendingPostulationsPage'
import OfertaDetallePage from './components/Pages/OfertaDetallePage/OfertaDetallePage'
import Login from "./components/Login/Login"
import Registro from "./components/Registro/Registro"
import AdminPanel from "./components/Pages/AdminPanel/AdminPanel"

export default function App() {
	return (
		<Routes>
			<Route element={<LayoutGeneral />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/ofertas" element={<OfertasPage />} />
				<Route path="/ofertas/:idOferta" element={<OfertaDetallePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contacto" element={<ContactoPage />} />
				<Route path="/myProfiles" element={<MyProfilesPage />} />
				<Route path="/pendingPostulations" element={<PendingPostulationsPage />} />
				<Route path="/iniciarSesion" element={<Login />} />
				<Route path="/registro" element={<Registro />} />
				<Route path="/adminPanel" element={<AdminPanel />} />
			</Route>
		</Routes>
	)
}