import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEventos } from "../store/eventosSlice";

export function useEventos() {
  const dispatch = useDispatch();
  const { lista, loading, error } = useSelector((state) => state.eventos);

  useEffect(() => {
    dispatch(obtenerEventos());
  }, [dispatch]);

  return {
    lista,
    loading,
    error,
  };
}
