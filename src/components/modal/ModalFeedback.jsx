// components/ui/ModalFeedback.jsx
import { useSelector, useDispatch } from "react-redux";
import { ocultarFeedback } from "../../store/feedbackSlice";
import { useEffect } from "react";

export default function ModalFeedback() {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(ocultarFeedback());
      }, 3000); // se oculta luego de 3s
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-[999]">
      <div
        className={`rounded-lg px-4 py-3 shadow-lg text-sm font-medium ${
          type === "success"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-red-100 text-red-700 border border-red-300"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
