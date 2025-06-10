// hooks/usePromosPorComunidad.js
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPromosPorComunidad } from "../store/promocionesSlice";

export const usePromosPorComunidad = (communityId) => {
  const dispatch = useDispatch();
  const { lista, loading, error } = useSelector((state) => state.promociones);

  useEffect(() => {
    if (communityId) {
      dispatch(fetchPromosPorComunidad(communityId));
    }
  }, [communityId, dispatch]);

  return { promociones: lista, loading, error };
};
