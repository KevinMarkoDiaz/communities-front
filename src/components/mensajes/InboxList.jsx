import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchConversations } from "../../store/conversationsSlice";
import ilustrb from "../../assets/ilustb.svg";
import ilust3 from "../../assets/ilust3.svg";

import { RiMessage2Line, RiMessage3Line } from "react-icons/ri";

// Utilidad para mostrar tiempo aproximado
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return "hace unos segundos";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  return `hace ${Math.floor(seconds / 86400)}d`;
}

const InboxList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.conversations);
  const { usuario } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-4">
        Cargando conversaciones...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-4">{error}</p>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-16">
        <img src={ilust3} alt="Sin mensajes" className="w-40 opacity-90" />
        <h2 className="text-xl font-semibold text-gray-700">
          📨 Tu bandeja está vacía
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-xs">
          Aún no tienes conversaciones activas.
          <br />
          Cuando alguien te escriba, verás los mensajes aquí.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition"
        >
          Ir al inicio
        </Link>
      </div>
    );
  }

  // 🚀 Agrupar por entidadId
  const grouped = items.reduce((acc, conv) => {
    const key = conv.entityId?._id || "otros";
    if (!acc[key]) acc[key] = [];
    acc[key].push(conv);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Conversaciones */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          📨 <span className="text-orange-500">Mis Conversaciones</span>
        </h2>

        {Object.entries(grouped).map(([entityId, conversations]) => {
          // 🚀 Obtener info de la entidad para encabezado
          const anyConv = conversations[0];
          const entityLabel =
            anyConv.entityType === "business"
              ? anyConv.entityId?.name
              : anyConv.entityId?.title || "Evento";
          const entityImage =
            anyConv.entityType === "business"
              ? anyConv.entityId?.profileImage
              : anyConv.entityId?.featuredImage;

          return (
            <div
              key={entityId}
              className="flex flex-col gap-2 border-b pb-4 mb-4"
            >
              {/* Divider con la entidad */}
              <div className="flex items-center gap-3 mb-2">
                {entityImage && (
                  <img
                    src={entityImage}
                    alt={entityLabel}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <h3 className="text-sm font-semibold text-gray-700">
                  {entityLabel}
                </h3>
              </div>

              <ul className="flex flex-col gap-2">
                {conversations.map((conv) => {
                  const hasUnread = conv.lastMessage && !conv.lastMessageIsRead;

                  return (
                    <li key={conv._id}>
                      <Link
                        to={`/inbox/conversation/${conv._id}`}
                        className={`flex items-center justify-between p-3 border rounded-lg bg-white transition hover:shadow-md ${
                          hasUnread
                            ? "border-orange-300 bg-orange-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="text-gray-400 shrink-0">
                            {hasUnread ? (
                              <RiMessage2Line
                                className="text-orange-500"
                                size={18}
                              />
                            ) : (
                              <RiMessage3Line size={18} />
                            )}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            {/* Usuario arriba */}
                            {usuario && (
                              <p className="text-[11px] text-gray-900 truncate">
                                {conv.user?.name || "Usuario"}
                              </p>
                            )}
                            {/* Mensaje abajo, siempre en una sola línea */}
                            <p
                              className={`text-xs truncate ${
                                hasUnread
                                  ? "text-gray-800 font-semibold"
                                  : "text-gray-500"
                              }`}
                            >
                              {conv.lastMessage || "Sin mensajes"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2 whitespace-nowrap shrink-0">
                          {conv.lastMessageAt && (
                            <span className="text-[10px] text-gray-400">
                              {formatTimeAgo(conv.lastMessageAt)}
                            </span>
                          )}
                          {hasUnread && (
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="w-full md:w-[600px] flex flex-col bg-orange-50 border border-orange-100 rounded-xl p-6 gap-4 shadow-sm">
        <img
          src={ilustrb}
          alt="Tips"
          className="w-44 h-auto mx-auto hidden md:block"
        />

        <h3 className="text-orange-600 font-semibold text-base text-center">
          💡 Consejos para una conversación respetuosa
        </h3>

        <div className="space-y-3">
          <details className="group border border-orange-100 rounded-lg bg-white px-4 py-2">
            <summary className="cursor-pointer flex justify-between items-center font-medium text-gray-800 hover:text-orange-600">
              ✅ Respeto ante todo
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
            <p className="mt-2 text-sm text-gray-600">
              Usa un lenguaje amable y evita cualquier comentario ofensivo o
              despectivo. Recuerda que detrás de cada mensaje hay una persona.
            </p>
          </details>

          <details className="group border border-orange-100 rounded-lg bg-white px-4 py-2">
            <summary className="cursor-pointer flex justify-between items-center font-medium text-gray-800 hover:text-orange-600">
              ✅ Protege tu privacidad
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
            <p className="mt-2 text-sm text-gray-600">
              No compartas datos sensibles como tu dirección, teléfono personal
              o información bancaria con personas que no conozcas.
            </p>
          </details>

          <details className="group border border-orange-100 rounded-lg bg-white px-4 py-2">
            <summary className="cursor-pointer flex justify-between items-center font-medium text-gray-800 hover:text-orange-600">
              ✅ Dialoga con claridad
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
            <p className="mt-2 text-sm text-gray-600">
              Expresa tus ideas con respeto y claridad. Si algo no queda claro,
              pregunta sin miedo. La buena comunicación evita malentendidos.
            </p>
          </details>

          <details className="group border border-orange-100 rounded-lg bg-white px-4 py-2">
            <summary className="cursor-pointer flex justify-between items-center font-medium text-gray-800 hover:text-orange-600">
              ✅ Recuerda las normas de convivencia
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
            <p className="mt-2 text-sm text-gray-600">
              Este espacio es para compartir, ayudar y construir comunidad.
              Evita actitudes que puedan incomodar o excluir a otras personas.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default InboxList;
