import OfertaList from '../OfertaList/OfertaList'
// import ofertas from "../../data/ofertas.json"
import Encabezado1 from '../Encabezado1'
import styles from './OfertaListContainer.module.css'
import { useEffect, useState } from 'react'

export default function OfertaListContainer({ mensaje }) {

	const [errorExcept, setError] = useState(null)
	const [isLoading, setCargando] = useState(true)
	const [ofertas, setOfertas] = useState([])
	useEffect(() => {

		setError(null)
		setCargando(true)
		setTimeout(() => {
			fetch('../../data/ofertas.json')
				.then(response => response.json())
				.then(data => {
					setOfertas(data)
				})
				.catch(error => {
					console.error("Ups. Hubo un error: ", error)
					setError(error)
				})
				.finally(
					setCargando(false)
				)
		}, 1000)

	}, [])

	return (
		<div>
			<Encabezado1>{mensaje}</Encabezado1>
			{isLoading ? (
				<div>
					<h3>Cargando ofertas...</h3>
				</div>
			) : errorExcept ? (
				<div>
					<h3>Hubo un error. No se cargaran items</h3>
					<p>El error es este: {errorExcept}</p>
				</div>
			) : (
				<div className={styles.container}>
					<OfertaList ofertas={ofertas} />
				</div>
			)}
		</div>
	)
}