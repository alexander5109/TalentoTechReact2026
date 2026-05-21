import OfertaList from '../OfertaList/OfertaList'
// import ofertas from "../../data/ofertas.json"
import Encabezado1 from '../Encabezado1'
import styles from './OfertaListContainer.module.css'
import { useEffect, useState } from 'react'

export default function OfertaListContainer({ mensaje }) {

	const [isLoading, setLoading] = useState(true)
	const [ofertas, setOfertas] = useState([])
	useEffect(() => {

		setLoading(true)
		setTimeout(() => {
			fetch('../../data/ofertas.json')
				.then(response => response.json())
				.then(data => {
					setOfertas(data)
					setLoading(false)
				})
		}, 1000)

	}, [])

	return (
		<div>
			<Encabezado1>{mensaje}</Encabezado1>
			{isLoading ? (
				<p>Cargando ofertas...</p>
			) : (
				<div className={styles.container}>
					<OfertaList ofertas={ofertas} />
				</div>
			)}
		</div>
	)
}