import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RutaPrivadaAdmin() {
  const { usuario, loading } = useSelector((s) => s.auth);
  const location = useLocation();

  if (loading) return <div className="p-4">Cargando…</div>;

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ Solo admin aquí
  if (usuario.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
