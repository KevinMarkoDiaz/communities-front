import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { MdChatBubbleOutline } from "react-icons/md";

export default function StartConversationButton({ entityType, entityId }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartConversation = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/conversations", {
        entityType,
        entityId,
      });
      const conversationId = res.data._id;
      navigate(`/inbox/conversation/${conversationId}`);
    } catch (error) {
      console.error(
        "❌ Error al iniciar conversación:",
        error.response?.data || error
      );
      alert(
        `Hubo un error al iniciar la conversación: ${
          error.response?.data?.message || "Intenta de nuevo."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartConversation}
      disabled={loading}
      className={`flex items-center justify-center gap-1 shadow-md hover:shadow-lg px-2 py-1 rounded border border-gray-300 transition text-xs font-medium ${
        loading
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-orange-600 hover:bg-gray-50"
      }`}
      title="Enviar mensaje"
    >
      {loading ? (
        "Abriendo chat..."
      ) : (
        <>
          <MdChatBubbleOutline className="text-base" />
          <span className="hidden sm:inline">Enviar mensaje</span>
        </>
      )}
    </button>
  );
}
