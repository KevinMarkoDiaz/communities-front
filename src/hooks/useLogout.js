import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { logout as logoutAuth } from "../store/authSlice";
import { resetApp } from "../store/appActions"; // ✅

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout"); // Limpia cookie en backend
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    // ✅ Limpiar Redux completamente
    dispatch(logoutAuth());
    dispatch(resetApp());

    navigate("/");
  };

  return handleLogout;
};

export default useLogout;
