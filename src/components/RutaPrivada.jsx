// src/components/RutaPrivada.jsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "../store/authSelectors";
import Loading from "./Loading";

export default function RutaPrivada() {
  const loading = useSelector(selectAuthLoading);
  const isAuth = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <Loading
          variant="splash"
          bgColor="bg-orange-500"
          message="Preparando tu experiencia…"
        />
      </div>
    );
  }
  if (!isAuth)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
