import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerComunidades } from "../store/comunidadesSlice";

export function useComunidades() {
  const dispatch = useDispatch();
  const { lista, loading, error, busqueda } = useSelector(
    (state) => state.comunidades
  );

  useEffect(() => {
    dispatch(obtenerComunidades());
  }, [dispatch]);

  const comunidadesFiltradas = lista.filter((comunidad) =>
    comunidad.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    lista,
    comunidadesFiltradas,
    loading,
    error,
    busqueda,
  };
}
