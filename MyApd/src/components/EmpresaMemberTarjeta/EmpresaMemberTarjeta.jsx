import styles from './EmpresaMemberTarjeta.module.css'

export default function EmpresaMemberTarjeta({
	nombre,
	rol,
	imagen
}) {

	return (
		<div className={styles.card}>
			<img src={imagen} alt={nombre} className={styles.image} />
			<h4>{nombre}</h4>
			<p>{rol}</p>
		</div>
	)
}