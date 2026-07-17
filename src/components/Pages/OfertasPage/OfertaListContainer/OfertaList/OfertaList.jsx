import ApdOfertaCard from '../../../../common/ApdOfertaCard/ApdOfertaCard'
import styles from './OfertaList.module.css'

export default function OfertaList({ ofertas }) {

	return (
		<div className={styles.list}>
			{ofertas.map(oferta => (
				<ApdOfertaCard
					key={oferta.idoferta}
					offer={oferta}
				/>
			))}
		</div>
	)
}