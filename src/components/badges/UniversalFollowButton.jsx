import { useSelector, useDispatch } from "react-redux";
import { fetchFollowings } from "../../store/followSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function UniversalFollowButton({ entityType, entityId }) {
  const dispatch = useDispatch();
  const { items, loading: loadingFollows } = useSelector(
    (state) => state.follow
  );
  const [loading, setLoading] = useState(false);

  const isFollowed = items.some(
    (f) => f.entityType === entityType && f.entityId === entityId
  );

  const toggleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowed) {
        await axiosInstance.delete("/follow", {
          data: { entityType, entityId },
        });
      } else {
        await axiosInstance.post("/follow", { entityType, entityId });
      }
      // Volver a traer todos los seguimientos
      await dispatch(fetchFollowings());
    } catch (err) {
      console.error(err);
      alert("Error al cambiar seguimiento");
    } finally {
      setLoading(false);
    }
  };

  // Opcional: Cargar al montar
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchFollowings());
    }
  }, [dispatch, items.length]);

  return (
    <button
      onClick={toggleFollow}
      disabled={loading || loadingFollows}
      className={`px-4 py-2 rounded ${
        isFollowed ? "bg-gray-300 text-black" : "bg-blue-600 text-white"
      }`}
    >
      {loading ? "..." : isFollowed ? "Siguiendo" : "Seguir"}
    </button>
  );
}
