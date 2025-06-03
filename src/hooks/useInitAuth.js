// src/hooks/useAuthInit.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../store/authSlice";

export const useInitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
};
