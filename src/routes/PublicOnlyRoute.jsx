// src/routes/PublicOnlyRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "../store/authSelectors";

export default function PublicOnlyRoute({ children }) {
  const loading = useSelector(selectAuthLoading);
  const isAuth = useSelector(selectIsAuthenticated);

  if (loading) return null; // evita parpadeo
  if (isAuth) return <Navigate to="/dashboard/perfil" replace />; // redirige si ya logueado
  return children;
}
