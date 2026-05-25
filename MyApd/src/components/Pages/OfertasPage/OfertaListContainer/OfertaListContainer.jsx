import OfertaList from '../OfertaList/OfertaList'
import styles from './OfertaListContainer.module.css'
import { useEffect, useState } from 'react'

export default function OfertaListContainer({ filtros }) {
	// console.log(filtros)
	const [errorExcept, setError] = useState(null)
	const [isLoading, setCargando] = useState(true)
	const [ofertas, setOfertas] = useState([])
	useEffect(() => {

		setError(null)
		setCargando(true)
		//TIMEOUT PARA SIMULAR FETCHEO PESADO...
		const fakeDelay = 350;

		setTimeout(() => {
			fetch('/data/ofertas.json')
				.then((respuesta) => {
					if (!respuesta.ok) {
						throw new Error('No se pudo encontrar ofertas en el servidor');
					}
					return respuesta.json()
				})
				.then(data => {
					setOfertas(data);
				})
				.catch(error => {
					console.error("Ups. Hubo un error: ", error)
					setError(error)
				})
				.finally(() => {
					setCargando(false)
				})
		}, fakeDelay)

	}, [])

	const ofertasFiltradas = ofertas.filter((oferta) => {
		const coincideCargo = !filtros.cargo ||
			oferta.cargo
				.toLowerCase()
				.includes(
					filtros.cargo.toLowerCase()
				)

		const coincideDistrito =
			!filtros.distrito ||
			oferta.descdistrito === filtros.distrito

		const coincideTurno =
			!filtros.turno ||
			oferta.turno === filtros.turno

		const coincideEstado =
			!filtros.estado ||
			oferta.estado === filtros.estado

		return (
			coincideCargo &&
			coincideDistrito &&
			coincideEstado &&
			coincideTurno
		)
	})


	return (
		<>
			{isLoading ? (
				<div>
					<h3>Cargando ofertas...</h3>
				</div>
			) : errorExcept ? (
				<div>
					<h3>Ocurrio un error: </h3>
					<p className={styles.error}>{errorExcept.message}</p>
				</div>
			) : (
				<div className={styles.container}>
					<OfertaList ofertas={ofertasFiltradas} />
				</div>
			)}
		</>
	)
}