import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function LikeButton({
  targetType,
  targetId,
  initialLikes = [],
  className,
}) {
  const { usuario } = useSelector((state) => state.auth);

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(initialLikes)) {
      setLikesCount(initialLikes.length);

      if (usuario) {
        const found = initialLikes.some((id) => id.toString() === usuario._id);
        setLiked(found);
      } else {
        setLiked(false);
      }
    }
  }, [initialLikes.length, usuario?._id, targetId]);

  const handleToggleLike = async () => {
    if (!usuario) {
      alert("Debes iniciar sesión para dar me gusta.");
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
    } catch (error) {
      console.error("❌ Error togglear like:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className={`flex items-center gap-1 bg-white transition px-3 py-2 rounded text-xs font-medium ${className}`}
      title={liked ? "Quitar me gusta" : "Dar me gusta"}
    >
      {liked ? (
        <AiFillHeart className="text-2xl text-red-500 transition" />
      ) : (
        <AiOutlineHeart className="text-2xl text-gray-400 transition" />
      )}
      <span className="text-xs text-gray-500">{likesCount}</span>
    </button>
  );
}
