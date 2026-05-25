import { useState, useContext, createContext } from 'react'

export const PendingPostulationsContext = createContext()

export function usePendingPostulations() {
	const context = useContext(PendingPostulationsContext)
	if (!context) {
		throw new Error('usePendingPostulations debe ser usado dentro del Provider')
	}
	return context
}

export function PendingPostulationsProvider({ children }) {
	const [pendingPostulations,setPendingPostulations] = useState([])

	function addToPendingPostulations(offer) {
		const alreadyExists = pendingPostulations.some(item => item.idoferta === offer.idoferta)
		if (!alreadyExists) {
			setPendingPostulations((prev) => [
				...prev,
				offer
			])
		}
	}

	function removeFromPendingPostulations(idOferta) {
		setPendingPostulations((prev) =>
			prev.filter(
				item =>
					item.idoferta !== idOferta
			)
		)
	}

	function clearPendingPostulations() {
		setPendingPostulations([])
	}

	return (
		<PendingPostulationsContext.Provider
			value={{
				pendingPostulations,
				addToPendingPostulations,
				removeFromPendingPostulations,
				clearPendingPostulations,
			}}
		>
			{children}
		</PendingPostulationsContext.Provider>
	)
}