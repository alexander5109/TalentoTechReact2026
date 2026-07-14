import { Routes, Route } from "react-router-dom"
import LayoutGeneral from './components/LayoutGeneral'
import RutaProtegida from "./components/common/RutaProtegida/RutaProtegida"
// public pages
import HomePage from './components/Pages/HomePage/HomePage'
import OfertasPage from './components/Pages/OfertasPage/OfertasPage'
import AboutPage from './components/Pages/AboutPage/AboutPage'
import ContactoPage from './components/Pages/ContactoPage/ContactoPage'
import OfertaDetallePage from './components/Pages/OfertaDetallePage/OfertaDetallePage'
import LoginPage from "./components/Pages/LoginPage/LoginPage.jsx"
import SignUpPage from "./components/Pages/SignUpPage/SignUpPage.jsx"
// user pages
import UserSearchProfilesPage from './components/Pages/UserSearchProfilesPage/UserSearchProfilesPage'
import UserPendingPostulationsPage from './components/Pages/UserPendingPostulationsPage/UserPendingPostulationsPage'
import UserAccountSettingsPage from './components/Pages/UserAccountSettingsPage/UserAccountSettingsPage.jsx'
import UserAdminPanel from "./components/Pages/UserAdminPanel/UserAdminPanel"


export default function App() {
	return (
		<Routes>
			<Route element={<LayoutGeneral />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/ofertas" element={<OfertasPage />} />
				<Route path="/ofertas/:idOferta" element={<OfertaDetallePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contacto" element={<ContactoPage />} />
				<Route path="/userSearchProfiles" element={<UserSearchProfilesPage />} />
				<Route path="/userPendingPostulations" element={<UserPendingPostulationsPage />} />
				<Route path="/iniciarSesion" element={<LoginPage />} />
				<Route path="/crearUsuario" element={<SignUpPage />} />
				<Route path="/userAccountSettings" element={<UserAccountSettingsPage />} />
				<Route path="/userAdminPanel" element={
					<RutaProtegida rolesPermitidos={['admin']}>
						<UserAdminPanel />
					</RutaProtegida>
				} />
			</Route>
		</Routes>
	)
}