import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ApdPrettyP from '../common/ApdPrettyP/ApdPrettyP';
import ApdSpinner from '../common/ApdSpinner/ApdSpinner';
export default function RutaProtegida({
	children,
	rolesPermitidos = []
}) {

	const { user, loading } = useAuth();

	if (loading) {
		return <ApdSpinner />
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