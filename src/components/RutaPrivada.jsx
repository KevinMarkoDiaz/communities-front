import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function RutaPrivada() {
  const usuario = useSelector((state) => state.auth.usuario)

  return usuario ? <Outlet /> : <Navigate to="/login" />
}
