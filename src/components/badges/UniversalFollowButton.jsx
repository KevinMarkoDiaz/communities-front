import { useSelector, useDispatch } from "react-redux";
import { fetchFollowings } from "../../store/followSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { MdStar, MdStarBorder } from "react-icons/md";

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
      await dispatch(fetchFollowings());
    } catch (err) {
      console.error(err);
      alert("Error al cambiar seguimiento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchFollowings());
    }
  }, [dispatch, items.length]);

  return (
    <button
      onClick={toggleFollow}
      disabled={loading || loadingFollows}
      className={`flex items-center justify-center gap-1 shadow-md hover:shadow-lg px-2 py-1 rounded border border-gray-300 transition text-xs font-medium
    ${
      isFollowed
        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
        : "bg-white text-orange-600 hover:bg-gray-50"
    }
  `}
      title={isFollowed ? "Siguiendo" : "Seguir"}
    >
      {loading ? (
        "..."
      ) : (
        <>
          {isFollowed ? (
            <MdStar className="text-base" />
          ) : (
            <MdStarBorder className="text-base" />
          )}
          {/* Texto visible solo en escritorio */}
          <span className="sm:inline">
            {isFollowed ? "Siguiendo" : "Seguir"}
          </span>
        </>
      )}
    </button>
  );
}
