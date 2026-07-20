import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ApdSpinner from "../../common/ApdSpinner/ApdSpinner";

import OfertaDetalle from "./OfertaDetalle/OfertaDetalle"

export default function OfertaDetallePage() {
	const { idOferta } = useParams()
	const [oferta, setOferta] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch("/data/ofertas.json")
			.then((respuesta) => respuesta.json())
			.then((data) => {
				const ofertaEncontrada = data.find((item) => item.idoferta.toString() === idOferta)
				setOferta(ofertaEncontrada)
			})
			.finally(() => {
				setLoading(false)
			})

	}, [idOferta])

	if (loading) {
		<ApdSpinner />;
		return <h2>Cargando detalle...</h2>
	}

	if (!oferta) {
		return <h2>No se encontró la oferta</h2>
	}

	return <OfertaDetalle offer={oferta} />
}