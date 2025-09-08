// src/components/Loading.jsx
import React from "react";

// Importa tu SVG como URL (ajusta la ruta si usas alias @)
import defaultLogoUrl from "../assets/icono.svg";

// Utilidad simple para unir classNames
const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Loading({
  variant = "splash", // "splash" | "inline"
  message = "Cargando…",
  bgColor = "bg-red-600", // cambia a tu color de marca: "bg-orange-500", "bg-sky-600", etc.
  textColor = "text-white",
  className = "",
  showMessage = true,
  main = false, // <<--- NUEVO: si es true, muestra también el logo
  logoUrl = defaultLogoUrl, // <<--- NUEVO: permite sobreescribir el logo por prop
}) {
  if (variant === "inline") {
    return (
      <div className={cx("flex items-center justify-center gap-2", className)}>
        {main && (
          <img
            src={logoUrl}
            alt="Logo"
            className="w-5 h-5 object-contain shrink-0 opacity-90"
            draggable={false}
          />
        )}

        <div className="relative w-6 h-6">
          {/* Anillo */}
          <div className="w-full h-full border-2 border-current/30 border-t-transparent rounded-full animate-spin" />
          {/* Orbe */}
          <span className="absolute inset-0 block rounded-full animate-[orbit_1.1s_linear_infinite]">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-current" />
          </span>
        </div>

        {showMessage && (
          <span className="text-sm font-medium opacity-80">{message}</span>
        )}

        <Style />
      </div>
    );
  }

  // SPLASH
  return (
    <div
      className={cx(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        bgColor,
        textColor,
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="flex flex-col items-center gap-4 animate-[fadein_300ms_ease-out_1] gap-12">
        {/* Marca / Logo textual o con imagen */}
        {main ? (
          <div className="text-2xl font-black tracking-tight flex gap-12 items-center ">
            <img
              src={logoUrl}
              alt="Communidades"
              className="w-25 h-25 lg:w-40 lg:h-40 object-contain drop-shadow-sm select-none"
              draggable={false}
            />
            <p className="text-2xl">Communidades</p>
          </div>
        ) : (
          <div className="text-2xl font-black tracking-tight">Communidades</div>
        )}

        {/* Spinner pro */}
        <div className="relative w-16 h-16 text-white">
          {/* Anillo principal */}
          <div className="w-full h-full border-4 border-white/30 border-t-transparent rounded-full animate-spin" />
          {/* Halo suave (glow) */}
          <div className="absolute inset-[-6px] rounded-full blur-md opacity-30 bg-white" />
          {/* Orbe orbitando */}
          <span className="absolute inset-0 block rounded-full animate-[orbit_1.2s_linear_infinite]">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white" />
          </span>
        </div>

        {showMessage && (
          <p className="text-sm font-medium opacity-90">{message}</p>
        )}
      </div>

      {/* Respeta reduced motion */}
      <Style />
    </div>
  );
}

/**
 * Inyecta keyframes necesarios sin tocar tailwind.config.
 * - orbit: anima el puntito alrededor del anillo
 * - fadein: entrada suave del bloque
 * - reduce motion: desactiva animaciones fuertes
 */
function Style() {
  return (
    <style>{`
      @keyframes orbit {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes fadein {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-spin,
        [class*="animate-[orbit"] {
          animation: none !important;
        }
      }
    `}</style>
  );
}
