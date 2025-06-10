import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEventos, setBusqueda } from "../store/eventosSlice";

export function useEventos() {
  const dispatch = useDispatch();
  const { lista, loading, error, busqueda } = useSelector(
    (state) => state.eventos
  );

  useEffect(() => {
    if (!lista || lista.length === 0) {
      dispatch(obtenerEventos());
    }
  }, [dispatch, lista]);

  const eventosFiltrados = (lista || []).filter((evento) =>
    evento.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    lista: eventosFiltrados,
    loading,
    error,
    busqueda,
    setBusqueda: (texto) => dispatch(setBusqueda(texto)),
  };
}
