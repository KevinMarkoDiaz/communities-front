import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComunidades,
  setBusqueda as setBusquedaComunidades,
} from "../store/comunidadesSlice";

export function useComunidades() {
  const dispatch = useDispatch();
  const { lista, loadingLista, error, busqueda, loaded } = useSelector(
    (state) => state.comunidades
  );

  const { coords } = useSelector((state) => state.ubicacion);

  useEffect(() => {
    if (coords && loaded) {
      dispatch(fetchComunidades(coords));
    }
  }, [loaded, dispatch]);

  const comunidadesFiltradas = lista.filter((comunidad) =>
    comunidad.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    lista,
    comunidadesFiltradas,
    loading: loadingLista,
    error,
    busqueda,
    setBusqueda: (text) => dispatch(setBusquedaComunidades(text)),
  };
}
