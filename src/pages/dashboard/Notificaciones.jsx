import NotificationCenter from "./notificacion/NotificationCenter";

// src/pages/dashboard/Notificaciones.jsx
export default function Notificaciones() {
  return (
    <div className="max-w-[1200px] w-full flex flex-col gap-6 md:gap-12 xl:gap-16 px-2 md:px-4 md:px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Tus notificaciones</h1>
        <h2 className="text-base text-gray-600 font-normal">
          Mantente al día con lo que ocurre en tu comunidad
        </h2>
        <p className="  text-xs text-gray-500 max-w-2xl">
          Aquí encontrarás recordatorios, novedades y mensajes importantes que
          te ayudarán a estar siempre conectado con los negocios, eventos y
          servicios que reflejan tu cultura y te acompañan en tu camino.
        </p>
      </div>

      <NotificationCenter />

      {/* Aquí puedes agregar bloques adicionales */}
    </div>
  );
}
