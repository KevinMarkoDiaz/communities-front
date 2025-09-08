import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchConversations } from "../../store/conversationsSlice";
import ilustrb from "../../assets/ilust1.svg";
import ilust3 from "../../assets/ilust3.svg";
import { RiMessage2Line, RiMessage3Line } from "react-icons/ri";
import Loading from "../Loading";
import ImagePlaceholderIcon from "../placeholder/ImagePlaceholderIcon";

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

  if (loading)
    return (
      <Loading
        variant="splash"
        bgColor="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-700"
        message="Estamos cargando tus mensajes…"
      />
    );
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-16 px-4">
        <img src={ilust3} alt="Sin mensajes" className="w-40 opacity-90" />
        <h2 className=" text-lg font-semibold text-gray-700">
          📨 Tu bandeja está vacía
        </h2>
        <p className="text-gray-600  text-xs md:text-base max-w-xs">
          Aún no tienes conversaciones activas.
          <br />
          Cuando alguien te escriba, verás los mensajes aquí.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white  text-xs font-medium px-4 py-2 rounded transition"
        >
          Ir al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 flex flex-col lg:flex-row gap-4 md:gap-8">
      {/* Conversaciones individuales */}
      <div className="w-full md:flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          📨 <span className="text-orange-500">Mis Conversaciones</span>
        </h2>

        <ul className="flex flex-col gap-2">
          {[...items]
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((conv) => {
              const isInitiator = conv.user?._id === usuario.id;
              const hasUnread = conv.lastMessage && !conv.lastMessageIsRead;

              const displayName = isInitiator
                ? conv.entityType === "business"
                  ? conv.entityId?.name
                  : conv.entityId?.title || "Evento"
                : conv.user?.name || "Usuario";

              const profileImage = conv.user.profileImage;

              return (
                <li key={conv._id}>
                  <Link
                    to={`/dashboard/inbox/conversation/${conv._id}`}
                    className={`flex items-center justify-between max-w-[90vw] md:max-w-[450px] lg:max-w-[350px] 2xl:max-w-[550px] p-3 border rounded-lg bg-white transition hover:shadow-md ${
                      hasUnread
                        ? "border-orange-300 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={displayName}
                          className="w-9 h-9 rounded-full object-cover border border-gray-300 flex-none"
                        />
                      ) : (
                        <div className="flex-none">
                          <ImagePlaceholderIcon size={36} />
                        </div>
                      )}

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
                        <p className="text-[11px] text-gray-900 truncate">
                          {displayName}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            hasUnread
                              ? "text-gray-800 font-semibold"
                              : "text-gray-500"
                          }`}
                          title={
                            conv.lastMessage?.trim() !== ""
                              ? conv.lastMessage
                              : "Conversación iniciada, sin mensajes aún"
                          }
                        >
                          {conv.lastMessage?.trim() !== ""
                            ? conv.lastMessage
                            : "Conversación iniciada, sin mensajes aún"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-2 whitespace-nowrap shrink-0">
                      {conv.updatedAt && (
                        <span className="text-[10px] text-gray-400">
                          {formatTimeAgo(conv.updatedAt)}
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

      {/* Tips (sidebar) */}
      <div className="w-full  md:basis-[520px] md:flex-none md:max-w-[300px] 2xl:max-w-[600px] lg:basis-[560px] flex flex-col bg-orange-50 border border-orange-100 rounded-xl p-6 gap-4 shadow-sm">
        <img
          src={ilustrb}
          alt="Tips"
          className="w-44 xl:w-84 h-auto mx-auto hidden md:block"
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
              <summary className="cursor-pointer flex justify-between items-center text-xs lg:font-medium text-gray-800 hover:text-orange-600">
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
              <p className="mt-2 text-xs md:  text-xs text-gray-600">
                {tip.text}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxList;
