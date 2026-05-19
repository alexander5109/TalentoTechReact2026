import Header from './Header'
import Footer from './Footer'

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