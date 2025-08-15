import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  cargarNotificaciones,
  marcarNotificacionLeida,
} from "../../../store/notificacionesSlice";
import { FiCheckCircle } from "react-icons/fi";

export default function NotificationCenter() {
  const dispatch = useDispatch();
  const { items, loaded, loading } = useSelector(
    (state) => state.notificaciones
  );

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    if (!loaded) {
      dispatch(cargarNotificaciones());
    }
  }, [dispatch, loaded]);

  const markAsRead = (id) => {
    dispatch(marcarNotificacionLeida(id));
  };

  const notificacionesVisibles = items.slice(0, visibleCount);
  const hayMas = items.length > visibleCount;
  const puedeVerMenos = visibleCount > 5;

  const verMas = () => setVisibleCount((prev) => prev + 5);
  const verMenos = () => setVisibleCount(5);

  return (
    <div className="p-4 space-y-4 bg-gray-50 rounded-xl w-fit shadow-lg max-w-xl">
      {items.length === 0 && !loading && (
        <p className="text-gray-500">No tienes notificaciones.</p>
      )}

      {notificacionesVisibles.map((n) => (
        <div
          key={n._id}
          className={`border shadow  text-xs border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition hover:border-gray-300 ${
            n.read ? "bg-white" : "bg-blue-50"
          }`}
        >
          {/* Contenido principal */}
          <p
            className={`${
              n.read
                ? "text-gray-600 font-extralight"
                : "text-gray-800 font-light"
            }`}
          >
            {n.message}
          </p>

          {/* Acciones */}
          <div className="flex flex-col items-end text-right shrink-0">
            <div className="flex gap-4">
              <Link
                to={n.link}
                className="text-orange-500  text-xs font-medium hover:text-orange-700"
                onClick={() => markAsRead(n._id)}
              >
                Ver detalle
              </Link>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="text-gray-400 hover:text-green-500 transition"
                  aria-label="Marcar como leída"
                >
                  <FiCheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(n.createdAt).toLocaleString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}

      {/* Botones Ver más / Ver menos */}
      {(hayMas || puedeVerMenos) && (
        <div className="text-center flex justify-center gap-4">
          {hayMas && (
            <button
              onClick={verMas}
              className="  text-xs text-orange-600 hover:text-orange-800 font-medium transition"
            >
              Ver más
            </button>
          )}
          {puedeVerMenos && (
            <button
              onClick={verMenos}
              className="  text-xs text-gray-500 hover:text-gray-700 font-medium transition"
            >
              Ver menos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
