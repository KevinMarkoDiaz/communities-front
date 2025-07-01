// src/AuthLoader.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/authSlice";

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // No renderiza nada visible
  return null;
}
