import ApdLayoutStack from '../../../common/ApdLayoutStack/ApdLayoutStack'
import ApdFeedback from '../../../common/ApdFeedback/ApdFeedback'
import ApdH3 from '../../../common/ApdH3/ApdH3'
import ApdPanel from '../../../common/ApdPanel/ApdPanel'
import ApdOfertaCard from '../../../common/ApdOfertaCard/ApdOfertaCard'
import { useEffect, useState } from 'react'

export default function OfertaList({ filtros }) {
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
	if (isLoading) {
		return <ApdH3>Cargando ofertas...</ApdH3>;
	}

	if (errorExcept) {
		return (
			<ApdFeedback
				feedback={{
					type: "error",
					message: "No fue posible obtener las ofertas.",
					error: errorExcept
				}}
			/>
		);
	}

	if (ofertasFiltradas.length === 0) {
		return (
			<ApdFeedback
				feedback={{
					type: "info",
					message: "No se encontraron ofertas con esos filtros."
				}}
			/>
		);
	}

	return (
		<>
			{ofertasFiltradas.map(oferta => (
				<ApdOfertaCard
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</>
	);
}