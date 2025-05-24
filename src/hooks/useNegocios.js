import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerNegocios } from "../store/negociosSlice";

export function useNegocios() {
  const dispatch = useDispatch();
  const { lista, loading, error, busqueda, categoria } = useSelector(
    (state) => state.negocios
  );

  useEffect(() => {
    if (!lista || lista.length === 0) {
      dispatch(obtenerNegocios());
    }
  }, [dispatch, lista]);
  

  const negociosFiltrados = lista.filter((negocio) => {
    const coincideBusqueda = negocio.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "todas" || negocio.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  return {
    lista,
    negociosFiltrados,
    loading,
    error,
    busqueda,
    categoria,
  };
}
