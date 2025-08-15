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
import ilustrA from "../../assets/ilust1.svg";
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
    <div className="max-w-[1200px] mx-auto md:p-4 flex flex-col md:flex-row gap-4 md:gap-8">
      {/* 🟠 Chat principal */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 tracking-tight flex items-center gap-2">
          🗨️ <span className="text-orange-500 font-bold">Conversación</span>
        </h2>

        {/* Cabecera del chat */}
        <div className="flex flex-col p-3 gap-3 rounded-lg border border-gray-200 bg-white max-w-[90vw]">
          {/* Participante visible */}
          <div className="flex items-center gap-2 ">
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
              <p className="text-xs text-gray-700">
                {isInitiator ? entityLabel : participant?.name || "Usuario"}
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
                className="text-xs font-medium text-gray-700 truncate"
                title={usuario?.name}
              >
                {usuario?.name}
              </span>
            </div>
          )}
        </div>

        {/* Chat con fondo SVGs */}
        <div className="relative flex-1 min-h-[80svh] md:min-h-[60svh] max-w-[98vw] md::min-w-[360px] lg:min-w-[30vw] ">
          {/* 🎨 Fondo SVG decorativo */}
          <div className="absolute inset-0 overflow-x-hidden pointer-events-none z-0">
            <img
              src={spin1}
              alt=""
              className="absolute top-[180px] left-[190px] md:w-24 w-12 opacity-15"
            />
            <img
              src={spin2}
              alt=""
              className="absolute top-[16%] left-[80%] md:w-22 w-12 opacity-15"
            />
            <img
              src={spin3}
              alt=""
              className="absolute top-[60%] left-[50%] md:w-20 w-12 opacity-15"
            />
            <img
              src={spin4}
              alt=""
              className="absolute bottom-[10%] right-[15%] md:w-20 w-12 opacity-15"
            />
            <img
              src={spin5}
              alt=""
              className="absolute top-[40%] right-[50%] md:w-20 w-12 opacity-15 rotate-12"
            />
            <img
              src={spin1}
              alt=""
              className="absolute top-[40%] left-[10%] md:w-24 w-12 opacity-15 rotate-62"
            />
            <img
              src={spin2}
              alt=""
              className="absolute top-[86%] left-[30%] md:w-22 w-12 rotate-22 opacity-15"
            />
            <img
              src={spin3}
              alt=""
              className="absolute top-[5%] left-[5%] md:w-20 w-12 opacity-15 rotate-22"
            />
            <img
              src={spin4}
              alt=""
              className="absolute bottom-[50%] right-[95%] w-12 md:w-20 opacity-15"
            />
            <img
              src={spin5}
              alt=""
              className="absolute top-[40%] right-[0%] w-12 md:w-20 opacity-15 rotate-12"
            />
          </div>

          {/* 💬 Contenido del chat */}
          <div className="relative z-10  overflow-y-auto space-y-2 p-3  max-h-[70svh] md:max-h-[68vh]  max-w-[90vw]md:p-4 lg:p-8 p-1">
            {items.length === 0 && (
              <p className="text-gray-500 text-center">No hay mensajes aún.</p>
            )}
            {items.map((msg) => {
              const esMio = isMyMessage(msg);
              return (
                <div
                  key={msg._id}
                  className={`flex w-full ${
                    esMio ? "justify-end" : "justify-start"
                  } items-end gap-2`}
                >
                  {!esMio && !isInitiator && (
                    <img
                      src={participant?.profileImage}
                      alt="Participante"
                      className="w-12 h-12 rounded-full object-cover  shadow-lg"
                    />
                  )}
                  {!esMio && isInitiator && (
                    <img
                      src={entityImage}
                      alt="Participante"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`max-w-[78%] sm:max-w-xs p-3 rounded-xl shadow-md ${
                      esMio
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-xs 2xl:text-xs">{msg.text}</p>
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
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Formulario de envío */}
        <form onSubmit={handleSend} className="flex mt-2 max-w-[90vw]">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border text-xs 2xl:text-xs border-gray-300 rounded-l-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 max-w-[90vw]"
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-orange-500 text-xs text-white px-4 py-2 rounded-r-xl hover:bg-orange-600 disabled:opacity-50 transition"
          >
            {sending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>

      {/* 🟢 Caja de Tips */}
      <div className="w-full md:max-w-[300px] 2xl:max-w-[600px] md:basis-[520px] md:flex-none  lg:basis-[560px] flex flex-col bg-orange-50 border border-orange-100 rounded-xl p-2 md:p-6 gap-4 shadow-sm">
        <img
          src={ilustrA}
          alt="Tips"
          className="w-44 md:w-84 h-auto mx-auto hidden md:block"
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
              className="group border border-orange-100 rounded-lg bg-white px-2 md:px-4 py-2 max-w-[90vw]"
            >
              <summary className="cursor-pointer  text-xs 2xl:text-xs flex justify-between items-center font-medium text-gray-800 hover:text-orange-600">
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
              <p className="mt-2  text-xs 2xl:text-xs text-gray-600">
                {tip.text}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
