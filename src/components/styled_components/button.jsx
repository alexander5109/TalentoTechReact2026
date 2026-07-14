import styled from "styled-components";
// 1. Definimos un componente base para los botones
const BotonAccion = styled.button`
	
	background-color: transparent;
	
	border: 1px solid #ccc;
	
	border-radius: 5px;
	
	padding: 5px 10px;
	
	cursor: pointer;
	
	margin-left: 8px;
	
	transition: all 0.2s ease;
	
	&:hover {
	
	transform: translateY(-2px);
	
	box-shadow: 0 2px 5px rgba(0,0,0,0.1);
	
	}
`;
const BotonEditar = styled(BotonAccion)`
 
border-color: #ffc107;
 
color: #ffc107;
 
&:hover {
 
background-color: #ffc107;
 
color: white;
 
}
`;
const BotonEliminar = styled(BotonAccion)`
 
border-color: #dc3545;
 
color: #dc3545;
 
&:hover {
 
background-color: #dc3545;
 
color: white;
 
}
`;
// ... (lógica del componente Gestion)
<BotonEliminar onClick={() => handleDelete(prod.id)}>Eliminar</BotonEliminar >
<BotonEditar onClick={() => handleEditClick(prod)}>Editar</BotonEditar>