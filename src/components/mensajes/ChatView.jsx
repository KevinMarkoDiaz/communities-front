import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMessages,
  sendMessage,
  markMessageRead,
  clearMessages,
} from "../../store/messagesSlice";
import { fetchConversations } from "../../store/conversationsSlice";
import ilustrA from "../../assets/ilusta.svg";

// ✅ Utilidad para mostrar tiempo aproximado
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return "hace unos segundos";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  return `hace ${Math.floor(seconds / 86400)}d`;
}

const ChatView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error, sending } = useSelector(
    (state) => state.messages
  );
  const { usuario } = useSelector((state) => state.auth);
  const { items: conversations } = useSelector((state) => state.conversations);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(id));
    dispatch(fetchConversations());

    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // ✅ Marcar como leídos al abrir
    items.forEach((msg) => {
      if (!msg.isRead && !isMyMessage(msg)) {
        dispatch(markMessageRead(msg._id));
      }
    });
  }, [items, dispatch]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await dispatch(sendMessage({ conversationId: id, text }));
    setText("");
  };

  const isMyMessage = (msg) => {
    if (!msg || !msg.sender || !usuario) return false;
    if (typeof msg.sender === "string") {
      return usuario.id && msg.sender === usuario.id;
    }
    return usuario.id && msg.sender._id === usuario.id;
  };

  const conversation = conversations.find((c) => c._id === id);
  const participant = conversation?.user;
  const entityLabel =
    conversation?.entityType === "business"
      ? conversation?.entityId?.name
      : conversation?.entityId?.title;

  const entityTypeLabel =
    conversation?.entityType === "business" ? "Negocio" : "Evento";

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-4">Cargando mensajes...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-4">{error}</p>;
  }

  return (
    <div className="max-w-8xl mx-auto p-4 flex flex-col md:flex-row gap-6 md:gap-8">
      {/* 🟠 Chat principal */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight flex items-center gap-2">
          🗨️ <span className="text-orange-500 font-bold">Conversación</span>
        </h2>

        {/* Cabecera del chat */}
        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-white">
          {/* Usuario */}
          <div className="flex items-center gap-2">
            <img
              src={participant?.profileImage || "/avatar-placeholder.png"}
              alt={participant?.name || "Usuario"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-sm text-gray-700">
              {participant?.name || "Usuario"}
            </p>
          </div>
          {/* Entidad */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">{entityTypeLabel}:</span>
            <span
              className="text-sm font-medium text-gray-700 truncate max-w-[150px]"
              title={entityLabel}
            >
              {entityLabel}
            </span>
          </div>
        </div>

        <div className="flex-1 shadow-lg overflow-y-auto space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200 shadow-inner min-h-[60vh]">
          {items.length === 0 && (
            <p className="text-gray-500 text-center">No hay mensajes aún.</p>
          )}
          {items.map((msg) => (
            <div key={msg._id} className="flex w-full">
              <div
                className={`max-w-xs p-3 rounded-xl shadow ${
                  isMyMessage(msg)
                    ? "ml-auto bg-orange-500 text-white"
                    : "mr-auto bg-white border border-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <div className="text-[10px] text-gray-300 mt-1 flex items-center justify-between">
                  <span>{formatTimeAgo(msg.createdAt)}</span>
                  {isMyMessage(msg) && msg.isRead && (
                    <span className="ml-2">✔ Leído</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex mt-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 rounded-l-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-orange-500 text-white px-4 py-2 rounded-r-xl hover:bg-orange-600 disabled:opacity-50 transition"
          >
            {sending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>

      {/* 🟢 Caja de Tips */}
      <div className="w-full md:w-[600px] flex flex-col bg-orange-50 border border-orange-100 rounded-xl p-6 gap-4 shadow-sm">
        <img
          src={ilustrA}
          alt="Tips"
          className="w-44 h-auto mx-auto hidden md:block"
        />

        <h3 className="text-orange-600 font-semibold text-base text-center">
          💡 Consejos para una conversación respetuosa
        </h3>

        <div className="space-y-3">
          {[
            {
              title: "✅ Respeto ante todo",
              text: "Usa un lenguaje amable y evita cualquier comentario ofensivo o despectivo. Recuerda que detrás de cada mensaje hay una persona.",
            },
            {
              title: "✅ Protege tu privacidad",
              text: "No compartas datos sensibles como tu dirección, teléfono personal o información bancaria con personas que no conozcas.",
            },
            {
              title: "✅ Dialoga con claridad",
              text: "Expresa tus ideas con respeto y claridad. Si algo no queda claro, pregunta sin miedo. La buena comunicación evita malentendidos.",
            },
            {
              title: "✅ Recuerda las normas de convivencia",
              text: "Este espacio es para compartir, ayudar y construir comunidad. Evita actitudes que puedan incomodar o excluir a otras personas.",
            },
          ].map((tip, idx) => (
            <details
              key={idx}
              className="group border border-orange-100 rounded-lg bg-white px-4 py-2"
            >
              <summary className="cursor-pointer flex justify-between items-center font-medium text-gray-800 hover:text-orange-600">
                {tip.title}
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-2 text-sm text-gray-600">{tip.text}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
