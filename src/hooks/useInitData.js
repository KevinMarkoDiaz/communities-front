// src/hooks/useInitData.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNegocios } from "../store/negociosSlice";
import { obtenerEventos } from "../store/eventosSlice";
import { fetchComunidades } from "../store/comunidadesSlice";

export function useInitData() {
  const dispatch = useDispatch();

  const negociosLoaded = useSelector((state) => state.negocios.loaded);
  const eventosLoaded = useSelector((state) => state.eventos.loaded);
  const comunidadesLoaded = useSelector((state) => state.comunidades.loaded);

  useEffect(() => {
    if (!negociosLoaded) {
      dispatch(obtenerNegocios());
    }
  }, []); // Solo al montar

  useEffect(() => {
    if (!eventosLoaded) {
      dispatch(obtenerEventos());
    }
  }, []); // Solo al montar

  useEffect(() => {
    if (!comunidadesLoaded) {
      dispatch(fetchComunidades());
    }
  }, []); // Solo al montar
}
