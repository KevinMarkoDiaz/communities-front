// src/hooks/useInitData.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNegocios } from "../store/negociosSlice";
import { obtenerEventos } from "../store/eventosSlice";
import { fetchComunidades } from "../store/comunidadesSlice";
import { obtenerUbicacionUsuario } from "../store/ubicacionSlice";

export function useInitData() {
  const dispatch = useDispatch();

  const negociosLoaded = useSelector((state) => state.negocios.loaded);
  const eventosLoaded = useSelector((state) => state.eventos.loaded);
  const comunidadesLoaded = useSelector((state) => state.comunidades.loaded);
  const { coords, cargando } = useSelector((state) => state.ubicacion);

  // Obtener ubicación solo si no existe
  useEffect(() => {
    if (!coords && !cargando) {
      dispatch(obtenerUbicacionUsuario());
    }
  }, [dispatch, coords, cargando]);

  // Obtener negocios si no están cargados
  useEffect(() => {
    if (!negociosLoaded) {
      dispatch(obtenerNegocios(coords));
    }
  }, [dispatch, negociosLoaded, coords]);

  // Obtener eventos si no están cargados
  useEffect(() => {
    if (!eventosLoaded && coords) {
      dispatch(obtenerEventos(coords));
    }
  }, [dispatch, eventosLoaded, coords]);

  // Obtener comunidades SOLO cuando coords esté listo y aún no se hayan cargado
  useEffect(() => {
    if (!comunidadesLoaded && coords) {
      dispatch(fetchComunidades(coords)); // ✅ con ubicación
    }
  }, [dispatch, comunidadesLoaded, coords]);
}
