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

  const fetchAverage = async () => {
    try {
      const res = await axiosInstance.get(
        `/ratings/${targetType}/${targetId}/avg`
      );
      setAverage(res.data.avg);
      setCount(res.data.count);
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
    try {
      await axiosInstance.post("/ratings", {
        value,
        targetType,
        targetId,
      });
      setUserRating(value);
      fetchAverage();
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Error al enviar calificación",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={20}
            className={
              (
                hoverRating
                  ? hoverRating >= star
                  : userRating
                  ? userRating >= star
                  : average >= star
              )
                ? "text-yellow-400 cursor-pointer"
                : "text-gray-300 cursor-pointer"
            }
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRate(star)}
          />
        ))}
      </div>
      <div className="text-sm text-gray-600">
        {average.toFixed(1)} de 5 ({count} valoraciones)
      </div>
    </div>
  );
};

export default StarRating;
