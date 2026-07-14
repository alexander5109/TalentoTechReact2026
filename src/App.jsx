import { Routes, Route } from "react-router-dom"
import LayoutGeneral from './components/LayoutGeneral'
import HomePage from './components/Pages/HomePage/HomePage'
import OfertasPage from './components/Pages/OfertasPage/OfertasPage'
import AboutPage from './components/Pages/AboutPage/AboutPage'
import ContactoPage from './components/Pages/ContactoPage/ContactoPage'
import MyProfilesPage from './components/Pages/MyProfilesPage/MyProfilesPage'
import PendingPostulationsPage from './components/Pages/PendingPostulationsPage/PendingPostulationsPage'
import OfertaDetallePage from './components/Pages/OfertaDetallePage/OfertaDetallePage'
import LoginPage from "./components/UserFormPages/LoginPage.jsx"
// import BaseUserForm from "./components/UserFormPages/BaseUserForm"
import AdminPanel from "./components/Pages/AdminPanel/AdminPanel"
import RutaProtegida from "./components/common/RutaProtegida/RutaProtegida"
// import SignUp from

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
				<Route path="/iniciarSesion" element={<LoginPage />} />
				{/* <Route path="/registro" element={<SignUp />} /> */}
				<Route path="/adminPanel" element={
					<RutaProtegida rolesPermitidos={['admin']}>
						<AdminPanel />
					</RutaProtegida>
				} />
			</Route>
		</Routes>
	)
}