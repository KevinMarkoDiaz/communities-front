// src/components/common/StarRating.jsx
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { mostrarFeedback } from "../../store/feedbackSlice";

const StarRating = ({ targetType, targetId }) => {
  const { usuario } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [animar, setAnimar] = useState(false);

  const fetchAverage = async () => {
    try {
      const res = await axiosInstance.get(
        `/ratings/${targetType}/${targetId}/avg`
      );
      setAverage(res.data.avg);
      setCount(res.data.count);
      if (res.data.userRating) {
        setUserRating(res.data.userRating); // opcional, si el backend lo devuelve
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  useEffect(() => {
    fetchAverage();
  }, [targetType, targetId]);

  const handleRate = async (value) => {
    if (!usuario) {
      dispatch(
        mostrarFeedback({
          message: "Debes iniciar sesión para calificar.",
          type: "error",
        })
      );
      return;
    }

    setUserRating(value);
    setAnimar(true);

    try {
      await axiosInstance.post("/ratings", {
        value,
        targetType,
        targetId,
      });
      fetchAverage();
      dispatch(
        mostrarFeedback({
          message: "¡Gracias por tu calificación!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Error al enviar calificación",
          type: "error",
        })
      );
    } finally {
      setTimeout(() => setAnimar(false), 800);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1 text-sm">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hoverRating
            ? hoverRating >= star
            : userRating
            ? userRating >= star
            : average >= star;

          return (
            <FaStar
              key={star}
              size={22}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRate(star)}
              className={`cursor-pointer transition-transform duration-200 ${
                isFilled ? "text-yellow-400" : "text-gray-300"
              } ${animar && userRating === star ? "animate-pulse-heart" : ""}`}
            />
          );
        })}
      </div>

      {userRating === 0 && (
        <div className="text-gray-500 text-xs">
          ¿Qué te pareció este lugar? ¡Dejá tu calificación!
        </div>
      )}

      {count > 0 && (
        <div className="text-gray-600 text-xs">
          {average.toFixed(1)} de 5 ({count} valoraciones)
        </div>
      )}
    </div>
  );
};

export default StarRating;
