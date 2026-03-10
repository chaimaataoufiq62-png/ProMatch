import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuth();

  // Vérifier si l'utilisateur est connecté
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Vérifier si l'utilisateur a le bon rôle
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={`/${user?.role}`} />;
  }

  return children;
};

export default PrivateRoute;