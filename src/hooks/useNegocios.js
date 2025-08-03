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
  }, [dispatch, lista.length]);

  // Aplicar filtros locales
  const negociosFiltrados = lista.filter((negocio) => {
    const nombre = negocio.nombre?.toLowerCase?.() || "";
    const categoriaFiltro =
      typeof categoria === "string" ? categoria.toLowerCase() : "todas";

    const coincideBusqueda = nombre.includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaFiltro === "todas" ||
      (Array.isArray(negocio.categories) &&
        negocio.categories.some(
          (cat) => cat?.name?.toLowerCase?.() === categoriaFiltro
        ));

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
