// src/components/dashboard/DashboardSectionHeader.jsx
import React from "react";

export default function DashboardSectionHeader({
  icon = "🌟",
  title = "Título de la sección",
  badge = "Sección",
  description = "",
  illustration,
}) {
  return (
    <div className="flex flex-col justify-center h-full w-full p-6 gap-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl shadow-lg">
      {/* Contenido */}
      <div className="flex flex-col gap-3 text-center md:text-left">
        <div className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full self-center md:self-start">
          {badge}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#141C24] tracking-tight leading-snug flex items-center gap-2 justify-center md:justify-start">
          <span>{icon}</span>
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Imagen decorativa */}
      {illustration && (
        <div className="flex justify-center md:justify-start">
          <div className="relative flex items-center justify-center">
            <img
              src={illustration}
              alt="Ilustración sección"
              className="w-20 md:w-64"
            />
          </div>
        </div>
      )}
    </div>
  );
}
