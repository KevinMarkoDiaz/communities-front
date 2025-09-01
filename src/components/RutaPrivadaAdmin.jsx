// src/components/RutaPrivadaAdmin.jsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthLoading, selectUsuario } from "../store/authSelectors";
import Loading from "./Loading";

export default function RutaPrivadaAdmin() {
  const loading = useSelector(selectAuthLoading);
  const usuario = useSelector(selectUsuario);
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <Loading />
      </div>
    );
  }
  if (!usuario)
    return <Navigate to="/login" replace state={{ from: location }} />;
  if (usuario.role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
