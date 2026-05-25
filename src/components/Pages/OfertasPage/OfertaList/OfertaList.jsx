import OfertaCard from '../OfertaCard/OfertaCard'
import styles from './OfertaList.module.css'

export default function OfertaList({ofertas}) {
	
	return (
		<div className={styles.list}>
			{ofertas.map(oferta => (
				<OfertaCard
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</div>
	)
}