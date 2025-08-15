import { useSelector, useDispatch } from "react-redux";
import { ocultarFeedback } from "../../store/feedbackSlice";
import { useEffect, useRef } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

export default function ModalFeedback() {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((state) => state.feedback);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!visible || type === "loading") return;

    timerRef.current = setTimeout(() => {
      dispatch(ocultarFeedback());
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [visible, type, dispatch]);

  if (!visible) return null;

  // 🔥 Colores fuertes por tipo
  const colorClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    loading: "bg-sky-500 text-white",
  };

  const iconos = {
    success: <AiOutlineCheckCircle className="text-white text-xl" />,
    error: <AiOutlineCloseCircle className="text-white text-xl" />,
    loading: (
      <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
    ),
  };

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex items-end justify-end">
      <div
        className={`rounded-xl px-5 py-4  text-xs font-semibold flex items-center gap-3 
          shadow-2xl shadow-black/30 animate-slide-in-up
          ${colorClasses[type]}
        `}
      >
        {iconos[type]}
        <span>{message}</span>
      </div>
    </div>
  );
}
