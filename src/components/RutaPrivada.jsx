import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RutaPrivada() {
  const { usuario, loading } = useSelector((s) => s.auth);
  const location = useLocation();

  if (loading) return <div className="p-4">Cargando…</div>;

  // ✅ Cualquier autenticado puede entrar, incluyendo admin
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
