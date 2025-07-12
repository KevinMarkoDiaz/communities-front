import NotificationCenter from "./notificacion/NotificationCenter";

// src/pages/dashboard/Notificaciones.jsx
export default function Notificaciones() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tus notificaciones</h1>
      <NotificationCenter />
    </div>
  );
}
