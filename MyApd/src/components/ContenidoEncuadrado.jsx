function ContenidoEncuadrado({children}) {

	const estilo = {
		border: "1px solid #ccc",
		padding: "16px",
		margin: "16px 0",
		backgroundColor: "green"
	}
	return <div style={estilo}>{children} </div >
}


export default ContenidoEncuadrado;