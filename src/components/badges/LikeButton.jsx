import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { mostrarFeedback } from "../../store/feedbackSlice";

export default function LikeButton({
  targetType,
  targetId,
  initialLikes = [],
  className,
}) {
  const { usuario } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (Array.isArray(initialLikes)) {
      setLikesCount(initialLikes.length);
      const found = usuario
        ? initialLikes.some((id) => id.toString() === usuario._id)
        : false;
      setLiked(found);
      setShowHint(!found); // solo mostrar hint si no ha dado like
    }
  }, [initialLikes.length, usuario?._id, targetId]);

  const handleToggleLike = async () => {
    if (!usuario) {
      dispatch(
        mostrarFeedback({
          message: "Debes iniciar sesión para dar me gusta.",
          type: "error",
        })
      );
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        targetType === "business"
          ? `/businesses/${targetId}/like`
          : `/events/${targetId}/like`;

      const res = await axiosInstance.put(endpoint);
      setLikesCount(res.data.likesCount);
      setLiked(res.data.liked);
      setShowHint(false);

      if (res.data.liked) {
        setAnimate(true); // dispara animación
        setTimeout(() => setAnimate(false), 600); // resetea animación
      }
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Error al marcar me gusta.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-1">
      <button
        onClick={handleToggleLike}
        disabled={loading}
        className={`flex items-center gap-1 bg-white transition px-3 py-2 rounded text-xs font-medium ${className}`}
        title={liked ? "Quitar me gusta" : "Dar me gusta"}
      >
        {liked ? (
          <AiFillHeart
            className={`text-4xl text-red-500 transition ${
              animate ? "heartbeat" : ""
            }`}
          />
        ) : (
          <AiOutlineHeart className="text-4xl text-gray-400 transition" />
        )}
        <span className="  text-xs text-gray-500">{likesCount}</span>
      </button>

      {showHint && (
        <span
          className="text-[14px] text-gray-500 pl-1 pt-1 animate-fade-in"
          onClick={() => setShowHint(false)}
        >
          💡 ¿Te gustó este lugar? Dale un ❤️
        </span>
      )}
    </div>
  );
}
