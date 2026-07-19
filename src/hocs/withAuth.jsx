import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function withAuth(Component) {
  function WithAuth(props) {
    const { user, loading } = useAuth();

    if (loading) return null; // or a shared loading spinner component

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  }

  WithAuth.displayName = `WithAuth(${Component.displayName || Component.name || "Component"})`;

  return WithAuth;
}
