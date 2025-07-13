import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiBell } from "react-icons/fi";
import {
  cargarNotificaciones,
  marcarTodasNotificacionesLeidas,
} from "../../store/notificacionesSlice";

export default function NotificationButton({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.notificaciones);
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    dispatch(cargarNotificaciones());
  }, [dispatch]);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleClick = () => {
    if (isDesktop) {
      setOpen(!open);
    } else {
      navigate("/dashboard/notificaciones");
    }
  };

  const handleMarkAllRead = () => {
    dispatch(marcarTodasNotificacionesLeidas());
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleClick}
        className={`relative p-2 hover:text-orange-500 transition-colors duration-200 ${className}`}
        aria-label="Notificaciones"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isDesktop && open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 && (
              <p className="p-4 text-gray-500 text-sm text-center">
                No tienes notificaciones.
              </p>
            )}
            {items.map((n) => (
              <Link
                key={n._id}
                to={n.link}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-2 px-4 py-3 text-sm transition-colors duration-200 border-b border-gray-100 ${
                  n.read ? "text-gray-500" : "text-gray-700 font-extralight"
                } hover:bg-gray-50 hover:text-gray-800`}
              >
                <span className="flex-1">{n.message}</span>
              </Link>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-gray-600 hover:text-orange-500 transition"
            >
              Marcar todas como leídas
            </button>
            <Link
              to="/dashboard/notificaciones"
              className="text-orange-500 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Ver todas
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
