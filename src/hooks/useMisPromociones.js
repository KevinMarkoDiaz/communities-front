// hooks/useMisPromociones.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMisPromos } from "../store/promocionesSlice";

export const useMisPromociones = () => {
  const dispatch = useDispatch();
  const { lista, loading, error } = useSelector((state) => state.promociones);

  useEffect(() => {
    dispatch(fetchMisPromos());
  }, [dispatch]);

  return { promociones: lista, loading, error };
};
