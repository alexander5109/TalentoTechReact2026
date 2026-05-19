function ContenidoEncuadrado({children}) {

	const estilo = {
		// borderRadius: "15px",
		border: "1px solid grey",
		padding: "16px",
		margin: "16px 64px",
		backgroundColor: "green"
	}
	return <div style={estilo}>{children} </div >
}


export default ContenidoEncuadrado;