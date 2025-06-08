import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  fetchComunidades,
  setBusqueda as setBusquedaComunidades
} from "../store/comunidadesSlice";

export function useComunidades() {
  const dispatch = useDispatch();
  const { lista, loading, error, busqueda } = useSelector(
    (state) => state.comunidades
  );

  useEffect(() => {
    if (!lista || lista.length === 0) {
      dispatch(fetchComunidades());
    }
  }, [dispatch, lista]);
  

  const comunidadesFiltradas = lista.filter((comunidad) =>
    comunidad.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    lista,
    comunidadesFiltradas,
    loading,
    error,
    busqueda,
    setBusqueda: (text) => dispatch(setBusquedaComunidades(text))
  };
}
