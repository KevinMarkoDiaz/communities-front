import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { cargarNotificaciones } from "../../store/notificacionesSlice";

export default function NotificationButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.notificaciones);
  const [open, setOpen] = useState(false);

  // Detecta si es desktop
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    dispatch(cargarNotificaciones());
  }, [dispatch]);

  const unreadCount = items.filter((n) => !n.read).length;

  // Click handler
  const handleClick = () => {
    if (isDesktop) {
      setOpen(!open);
    } else {
      navigate("/dashboard/notificaciones");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={handleClick} className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown en desktop */}
      {isDesktop && open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-50">
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 && (
              <p className="p-4 text-gray-500 text-sm">
                No tienes notificaciones.
              </p>
            )}
            {items.map((n) => (
              <Link
                key={n._id}
                to={n.link}
                className={`block px-4 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 ${
                  n.read ? "text-gray-500" : "text-black font-medium"
                }`}
                onClick={() => setOpen(false)}
              >
                {n.message}
              </Link>
            ))}
          </div>
          <div className="p-2 border-t border-gray-200">
            <Link
              to="/dashboard/notificaciones"
              className="text-blue-600 text-sm font-semibold block text-center"
              onClick={() => setOpen(false)}
            >
              Ver todas las notificaciones
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
