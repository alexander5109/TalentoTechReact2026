import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ApdPrettyP from '../common/ApdPrettyP/ApdPrettyP';
export default function RutaProtegida({
	children,
	rolesPermitidos = []
}) {

	const { user, loading } = useAuth();

	if (loading) {
		return <ApdPrettyP>Cargando...</ApdPrettyP>;
	}

	if (!user) {
		return <Navigate to="/iniciarSesion" Iniciar Sesion />;
	}

	if (
		rolesPermitidos.length > 0 &&
		!rolesPermitidos.includes(user.role)
	) {
		return <Navigate to="/" Home />;
	}

	return children;
}