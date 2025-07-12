import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  cargarNotificaciones,
  marcarNotificacionLeida,
} from "../../../store/notificacionesSlice";

export default function NotificationCenter() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.notificaciones);

  // 🚀 Cargar notificaciones cuando el componente se monta
  useEffect(() => {
    if (items.length === 0) {
      dispatch(cargarNotificaciones());
    }
  }, [dispatch, items.length]);

  // 🚀 Marcar como leída
  const markAsRead = (id) => {
    dispatch(marcarNotificacionLeida(id));
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Tus notificaciones</h1>
      {loading && <p>Cargando...</p>}

      {items.length === 0 && !loading && (
        <p className="text-gray-500">No tienes notificaciones.</p>
      )}

      {items.map((n) => (
        <div
          key={n._id}
          className={`border p-3 rounded ${
            n.read ? "bg-gray-100" : "bg-white"
          }`}
        >
          <p>{n.message}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Link
              to={n.link}
              className="text-blue-600 underline"
              onClick={() => markAsRead(n._id)}
            >
              Ver detalle
            </Link>
            {!n.read && (
              <button
                onClick={() => markAsRead(n._id)}
                className="text-sm text-gray-500"
              >
                Marcar como leída
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
