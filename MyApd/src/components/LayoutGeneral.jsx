import Header from './Header/Header'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'

import { Outlet } from 'react-router-dom'

export default function LayoutGeneral() {
	return (
		<>
			<Header />
			<NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}