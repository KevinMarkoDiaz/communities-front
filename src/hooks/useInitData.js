import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNegocios } from "../store/negociosSlice";
import { obtenerEventos } from "../store/eventosSlice";
import { fetchComunidades } from "../store/comunidadesSlice";

export function useInitData() {
  const dispatch = useDispatch();
  const negocios = useSelector((s) => s.negocios.lista);
  const eventos = useSelector((s) => s.eventos.lista);
  const comunidades = useSelector((s) => s.comunidades.lista);

  useEffect(() => {
    if (!negocios || negocios.length === 0) {
      dispatch(obtenerNegocios());
    }
    if (!eventos || eventos.length === 0) {
      dispatch(obtenerEventos());
    }
    if (!comunidades || comunidades.length === 0) {
      dispatch(fetchComunidades());
    }
  }, [dispatch, negocios, eventos, comunidades]);
}
