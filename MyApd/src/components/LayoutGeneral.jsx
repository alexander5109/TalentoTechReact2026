import Header from './Header/Header'
import Footer from './Footer/Footer'

export default function LayoutGeneral({ children }) {
	return (
		<>
			<Header />
			<main>
				{children}
			</main>
			<Footer />
		</>
	);
};