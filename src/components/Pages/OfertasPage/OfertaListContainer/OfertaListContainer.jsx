import ApdFeedback from '../../../common/ApdFeedback/ApdFeedback'
import OfertaList from './OfertaList/OfertaList'
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
		const fakeDelay = 0; // 350; // 1500;
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
					setError(error)
				})
				.finally(() => {
					setCargando(false)
				})
		}, fakeDelay)

	}, [])
	const ofertasFiltradas = ofertas.filter((oferta) => {

		const coincideCargo =
			filtros.cargos.length === 0 ||
			filtros.cargos.includes(oferta.cargo)

		const coincideDistrito =
			filtros.distritos.length === 0 ||
			filtros.distritos.includes(oferta.descdistrito)

		const coincideTurno =
			filtros.turnos.length === 0 ||
			filtros.turnos.includes(oferta.turno)

		const coincideEstado =
			filtros.estados.length === 0 ||
			filtros.estados.includes(oferta.estado)

		const coincideNivel =
			filtros.niveles.length === 0 ||
			filtros.niveles.includes(oferta.descnivelmodalidad)

		return (
			coincideCargo &&
			coincideDistrito &&
			coincideEstado &&
			coincideTurno &&
			coincideNivel
		)

	})
	return (
		<>
			{isLoading ? (
				<div>
					<h3>Cargando ofertas...</h3>
				</div>
			) : errorExcept ? (
				<ApdFeedback feedback={{
					type: "error",
					message: "No fue posible obtener las ofertas.",
					error: errorExcept
				}}
				/>
			) : (
				<div className={styles.container}>
					<OfertaList ofertas={ofertasFiltradas} />
				</div>
			)}
		</>
	);
}