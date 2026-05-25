import Header from './Header/Header'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'
import styles from "./LayoutGeneral.module.css"

import { Outlet } from 'react-router-dom'

export default function LayoutGeneral() {
	return (
		<div className={styles.appLayout}>
			<Header />
			<NavBar />
			<main className={styles.mainContent}>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}