// components/utils/ResetBusquedaOnMount.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { limpiarBusquedaGlobal } from "../store/busquedaGlobalSlice";

export default function ResetBusquedaOnMount() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(limpiarBusquedaGlobal());
  }, [dispatch]);

  return null; // No renderiza nada en pantalla
}
