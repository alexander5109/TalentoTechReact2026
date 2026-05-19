import Header from './Header/Header'
import Footer from './Footer/Footer'
import NavBar from './NavBar/NavBar'

export default function LayoutGeneral({ children }) {
	return (
		<>
			<Header />
			<NavBar />
			<main>
				{children}
			</main>
			<Footer />
		</>
	)
}