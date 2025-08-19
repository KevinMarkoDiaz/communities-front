// src/hooks/useInitData.js
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNegocios } from "../store/negociosSlice";
import { obtenerEventos } from "../store/eventosSlice";
import { fetchComunidades } from "../store/comunidadesSlice";
import { obtenerUbicacionUsuario } from "../store/ubicacionSlice";

export function useInitData() {
  const dispatch = useDispatch();

  const { coords, cargando } = useSelector((s) => s.ubicacion);

  // --- refs para evitar dobles disparos simultáneos, pero garantizando fetch on mount
  const didMountFetchRef = useRef(false);
  const didLocationFetchRef = useRef(false);

  // 1) Siempre intenta obtener ubicación al montar si no la tenés
  useEffect(() => {
    if (!coords && !cargando) {
      dispatch(obtenerUbicacionUsuario());
    }
  }, [dispatch, coords, cargando]);

  // Helper para armar payloads con lat/lng opcionales
  const getLoc = () => (coords ? { lat: coords.lat, lng: coords.lng } : {});

  // 2) FETCH ON MOUNT (siempre), sin depender de "loaded"
  useEffect(() => {
    if (didMountFetchRef.current) return;
    didMountFetchRef.current = true;

    const loc = getLoc();

    // Negocios / Eventos / Comunidades — page 1, forzando recarga
    dispatch(obtenerNegocios({ ...loc, page: 1, force: true }));
    dispatch(obtenerEventos({ ...loc, page: 1, force: true }));
    dispatch(fetchComunidades({ ...loc, page: 1, force: true }));
  }, [dispatch]); // <- sólo al montar

  // 3) Cuando llegan coords por primera vez (o cambian), refrescar con ubicación precisa
  useEffect(() => {
    if (!coords) return;

    // si ya refrescamos por coords una vez, no vuelvas a spamear en renders siguientes
    if (didLocationFetchRef.current) return;
    didLocationFetchRef.current = true;

    const loc = { lat: coords.lat, lng: coords.lng };

    dispatch(obtenerNegocios({ ...loc, page: 1, force: true }));
    dispatch(obtenerEventos({ ...loc, page: 1, force: true }));
    dispatch(fetchComunidades({ ...loc, page: 1, force: true }));
  }, [coords, dispatch]);
}
