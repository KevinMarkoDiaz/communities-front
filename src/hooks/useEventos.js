// useEventos.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerEventos } from "../store/eventosSlice";

export function useEventos() {
  const dispatch = useDispatch();
  const lista = useSelector((state) => state.eventos.lista);
  const loading = useSelector((state) => state.eventos.loadingLista);
  const error = useSelector((state) => state.eventos.error);

  useEffect(() => {
    if (lista.length === 0) {
      dispatch(obtenerEventos());
    }
  }, [dispatch, lista.length]);

  return { lista, loading, error };
}
