import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RutaPrivada() {
  // Accede al usuario desde el store de Redux
  const usuario = useSelector((state) => state.auth.usuario);

  // Si no está autenticado, redirige al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza las rutas hijas
  return <Outlet />;
}
