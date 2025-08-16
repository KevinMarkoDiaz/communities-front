import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { MdChatBubbleOutline } from "react-icons/md";
import { mostrarFeedback } from "../../store/feedbackSlice";
import { useDispatch, useSelector } from "react-redux";

export default function StartConversationButton({ entityType, entityId }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const usuario = useSelector((state) => state.auth.usuario);

  const handleStartConversation = async () => {
    if (!usuario) {
      dispatch(
        mostrarFeedback({
          message: "Debes iniciar sesión para enviar un mensaje.",
          type: "error",
        })
      );
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/conversations", {
        entityType,
        entityId,
      });
      const conversationId = res.data._id;
      navigate(`/dashboard/inbox/conversation/${conversationId}`);
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Hubo un error al iniciar la conversación.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartConversation}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all shadow-md  text-xs font-semibold
        ${
          loading
            ? "bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed"
            : "bg-white hover:bg-blue-50 text-blue-600 border border-blue-300"
        }
      `}
      title="Enviar mensaje"
    >
      {loading ? (
        <span className="animate-pulse">Abriendo chat...</span>
      ) : (
        <>
          <MdChatBubbleOutline className="text-lg" />
          <span className="sm:inline">Habla con nosotros</span>
        </>
      )}
    </button>
  );
}
