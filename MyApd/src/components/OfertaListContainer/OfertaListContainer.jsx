import OfertaList from '../OfertaList/OfertaList'
import ofertas from "../../data/ofertas.json"
import Encabezado1 from '../Encabezado1'
import styles from './OfertaListContainer.module.css'

export default function OfertaListContainer({ mensaje }) {
	return (
		<div>
			<Encabezado1>{mensaje}</Encabezado1>
			<div className={styles.container}>
				<OfertaList ofertas={ofertas} />
			</div>
		</div>
	)
}