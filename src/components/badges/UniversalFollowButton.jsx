import { useSelector, useDispatch } from "react-redux";
import { fetchFollowings } from "../../store/followSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { MdStar, MdStarBorder } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { mostrarFeedback } from "../../store/feedbackSlice";

export default function UniversalFollowButton({ entityType, entityId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = useSelector((state) => state.auth.usuario);
  const { items, loading: loadingFollows } = useSelector(
    (state) => state.follow
  );
  const [loading, setLoading] = useState(false);

  const isFollowed = items.some(
    (f) => f.entityType === entityType && f.entityId === entityId
  );

  const toggleFollow = async () => {
    if (!usuario) {
      dispatch(
        mostrarFeedback({
          message: "Debes iniciar sesión para seguir este perfil.",
          type: "error",
        })
      );
      return;
    }

    setLoading(true);
    try {
      if (isFollowed) {
        await axiosInstance.delete("/follow", {
          data: { entityType, entityId },
        });
      } else {
        await axiosInstance.post("/follow", { entityType, entityId });
      }
      await dispatch(fetchFollowings());
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "Error al cambiar seguimiento.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario && items.length === 0) {
      dispatch(fetchFollowings());
    }
  }, [dispatch, items.length, usuario]);

  return (
    <button
      onClick={toggleFollow}
      disabled={loading || loadingFollows}
      title={isFollowed ? "Ya estás siguiendo" : "Seguir"}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all shadow-md text-sm font-semibold
        ${
          isFollowed
            ? "bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300"
            : "bg-blue-100 hover:bg-blue-50 text-blue-600 border border-blue-300"
        }
      `}
    >
      {loading ? (
        <span className="animate-pulse">...</span>
      ) : (
        <>
          {isFollowed ? (
            <MdStar className="text-lg" />
          ) : (
            <MdStarBorder className="text-lg" />
          )}
          <span>{isFollowed ? "Siguiéndonos" : "¡Seguinos!"}</span>
        </>
      )}
    </button>
  );
}
