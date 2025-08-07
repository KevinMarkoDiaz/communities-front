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
import spin1 from "../../assets/spin1.svg";
import spin2 from "../../assets/spin2.svg";
import spin3 from "../../assets/spin3.svg";
import spin4 from "../../assets/spin4.svg";
import spin5 from "../../assets/spin5.svg";

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
  const { negocios } = useSelector((state) => state.comunidadSeleccionada);
  const { data: eventos } = useSelector((state) => state.eventos);

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
    return msg?.sender?._id === usuario?.id;
  };

  const conversation = conversations.find((c) => c._id === id);

  // 🧠 Determinar si el usuario es quien inició la conversación
  const isInitiator = conversation?.user?._id === usuario?.id;

  const participant = isInitiator ? conversation?.entityId : conversation?.user;

  // 🔍 Buscar entidad (si aplica)
  let entity = null;
  if (conversation?.tipo === "business") {
    entity = negocios?.find((n) => n._id === conversation?.entityId);
  } else if (conversation?.tipo === "event") {
    entity = eventos?.find((e) => e.id === conversation?.entityId);
  }

  const tipoLabel = conversation?.tipo === "business" ? "Negocio" : "Evento";
  const entityLabel =
    conversation?.tipo === "business"
      ? entity?.name || "Negocio"
      : entity?.title || "Evento";

  const entityImage =
    conversation?.tipo === "business"
      ? entity?.profileImage ?? "/placeholder.svg"
      : entity?.featuredImage ?? "/placeholder.svg";

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
        <div className="flex flex-col p-3 gap-3 rounded-lg border border-gray-200 bg-white">
          {/* Participante visible */}
          <div className="flex items-center gap-2">
            <img
              src={
                isInitiator
                  ? entityImage
                  : participant?.profileImage || "/avatar-placeholder.png"
              }
              alt="Participante"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              {isInitiator && (
                <span className="text-xs text-gray-400">{tipoLabel}:</span>
              )}
              <p className="text-sm text-gray-700">
                {isInitiator ? entityLabel : usuario?.name || "Usuario"}
              </p>
            </div>
          </div>

          {/* Info adicional (solo si el otro participante es una entidad) */}
          {isInitiator && (
            <div className="flex items-center gap-2">
              <img
                src={usuario?.profileImage}
                alt={usuario?.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <span
                className="text-sm font-medium text-gray-700 truncate"
                title={usuario?.name}
              >
                {usuario?.name}
              </span>
            </div>
          )}
        </div>

        {/* Chat con fondo SVGs */}
        <div className="relative flex-1 min-h-[60vh]">
          {/* 🎨 Fondo SVG decorativo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-11">
            <img
              src={spin1}
              alt=""
              className="absolute top-[180px] left-[190px] w-24 opacity-15"
            />
            <img
              src={spin2}
              alt=""
              className="absolute top-[16%] left-[80%] w-22  opacity-15"
            />
            <img
              src={spin3}
              alt=""
              className="absolute top-[60%] left-[50%] w-20 opacity-15 "
            />
            <img
              src={spin4}
              alt=""
              className="absolute bottom-[10%] right-[15%] w-20 opacity-15 "
            />
            <img
              src={spin5}
              alt=""
              className="absolute top-[40%] right-[50%] w-20 opacity-15  rotate-12"
            />
            <img
              src={spin1}
              alt=""
              className="absolute top-[40%] left-[10%] w-24 opacity-15 rotate-62"
            />
            <img
              src={spin2}
              alt=""
              className="absolute top-[86%] left-[30%] w-22 rotate-22  opacity-15"
            />
            <img
              src={spin3}
              alt=""
              className="absolute top-[5%] left-[5%] w-20 opacity-15 rotate-22"
            />
            <img
              src={spin4}
              alt=""
              className="absolute bottom-[50%] right-[95%] w-20 opacity-15 "
            />
            <img
              src={spin5}
              alt=""
              className="absolute top-[40%] right-[0%] w-20 opacity-15  rotate-12"
            />
          </div>

          {/* 💬 Contenido del chat */}
          <div className="relative z-10 shadow-lg overflow-y-auto space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200 shadow-inner h-full">
            {items.length === 0 && (
              <p className="text-gray-500 text-center">No hay mensajes aún.</p>
            )}
            {items.map((msg) => {
              const esMio = isMyMessage(msg);
              return (
                <div
                  key={msg._id}
                  className={`flex w-full z-15 ${
                    esMio ? "justify-end" : "justify-start"
                  } items-end gap-2`}
                >
                  {!esMio && !isInitiator && (
                    <img
                      src={usuario?.profileImage || participant?.profileImage}
                      alt="Participante"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  {!esMio && isInitiator && (
                    <img
                      src={entityImage}
                      alt="Participante"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`max-w-xs p-3 rounded-xl z-15 shadow-md ${
                      esMio
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className="text-[10px] text-gray-300 mt-1 flex items-center justify-between">
                      <span>{formatTimeAgo(msg.createdAt)}</span>
                      {esMio && msg.isRead && (
                        <span className="ml-2">✔ Leído</span>
                      )}
                    </div>
                  </div>

                  {esMio && (
                    <img
                      src={
                        isInitiator
                          ? usuario?.profileImage || participant?.profileImage
                          : entityImage
                      }
                      alt="Yo"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Formulario de envío */}
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
