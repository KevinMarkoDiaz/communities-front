// src/hooks/useCargarCategorias.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias } from "../store/categoriasSlice";

export function useCargarCategorias() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.data);

  useEffect(() => {
    if (!categorias || categorias.length === 0) {
      dispatch(fetchCategorias());
    }
  }, [categorias, dispatch]);
}
