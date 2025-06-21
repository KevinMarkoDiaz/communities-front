import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerNegocios,
  setBusqueda,
  setCategoria,
} from "../store/negociosSlice";

export function useNegocios() {
  const dispatch = useDispatch();
  const { lista, loading, error, busqueda, categoria } = useSelector(
    (state) => state.negocios
  );

  // Obtener negocios al montar
  useEffect(() => {
    if (!lista || lista.length === 0) {
      dispatch(obtenerNegocios());
    }
  }, [dispatch]);

  // Aplicar filtros locales
  const negociosFiltrados = lista.filter((negocio) => {
    const nombre = negocio.nombre?.toLowerCase?.() || "";
    const categoriaNegocio = negocio.category?.name?.toLowerCase?.() || "";
    const categoriaFiltro =
      typeof categoria === "string" ? categoria.toLowerCase() : "todas";

    const coincideBusqueda = nombre.includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaFiltro === "todas" || categoriaNegocio === categoriaFiltro;

    return coincideBusqueda && coincideCategoria;
  });

  return {
    lista,
    negociosFiltrados,
    loading,
    error,
    busqueda,
    categoria,
    setBusqueda: (text) => dispatch(setBusqueda(text)),
    setCategoria: (cat) => dispatch(setCategoria(cat)),
  };
}
