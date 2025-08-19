import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsGem } from "react-icons/bs";

export default function CardPromoHome({
  title,
  image,
  descuento, // fallback label (ej: "5 disponibles")
  maxClaims, // número total permitido (puede ser null/undefined => ilimitado)
  claimedCount = 0, // 🆕 cuántos ya reclamaron (default 0)
  businessId, // id del negocio para tomar logo desde Redux
  isPremium = false,
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Logo del negocio por ID
  const negocio = useSelector((state) =>
    state.negocios.lista?.find((n) => n._id === businessId)
  );
  const businessLogo = negocio?.profileImage;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🧮 Cálculo de “restantes”
  const hasCap = typeof maxClaims === "number" && !Number.isNaN(maxClaims);
  const remaining = hasCap
    ? Math.max(0, maxClaims - (claimedCount || 0))
    : null;

  const isAgotado = hasCap
    ? remaining === 0
    : // si no hay tope, intenta deducir del label existente
      descuento === "0 disponibles" || descuento?.includes("0 disponibles");

  // Texto del badge
  const badgeText = hasCap
    ? isAgotado
      ? "Cupones agotados"
      : `${remaining} disponibles`
    : descuento || "Disponible";

  const clasesBase = `
    relative group z-0 overflow-hidden transition my-4
    aspect-[9/16] rounded-[1.5rem] w-[220px] sm:w-[280px] md:w-[300px] lg:w-[245px] xl:w-[225px]
    hover:shadow-lg bg-gray-100
    ${
      isPremium
        ? "border-1 border-yellow-200 shadow-[0_0_10px_3px_rgba(234,179,8,0.4)]"
        : "shadow-md"
    }
  `;

  return (
    <div className={clasesBase}>
      {/* Imagen de fondo */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
          style={{ backgroundImage: `url("${image}")` }}
        />
      )}

      {/* Capa oscura activa en hover o siempre en mobile */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
          isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />

      {/* Icono Premium (opcional) */}
      {isPremium && (
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1 bg-black/70 text-yellow-300 px-2 py-1 rounded-full text-xs">
          <BsGem className="w-4 h-4" />
        </div>
      )}

      {/* Badge de cupón */}
      <div
        className={`m-4 transform transition-all duration-900 text-xs font-semibold text-center rounded-full py-1.5 px-4 self-center 
          ${
            isMobile
              ? "scale-105"
              : "group-hover:-translate-y-1 group-hover:scale-105"
          }
          ${
            isAgotado
              ? "bg-white text-red-700"
              : isPremium
              ? "bg-black shadow-[0_0_30px_20px_rgba(234,179,8,0.4)] text-green-300"
              : "bg-white shadow-md text-green-700"
          }
        `}
      >
        {badgeText}
      </div>

      {/* Logo del negocio abajo a la derecha */}
      {businessLogo && (
        <div className="absolute bottom-3 right-3 z-30">
          <img
            src={businessLogo}
            alt="Logo del negocio"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md"
          />
        </div>
      )}

      {/* Título sobre fondo oscuro al final */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-full flex items-end justify-center transition-all duration-500 z-20 pointer-events-none ${
          isMobile
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        <div className="w-full text-white text-lg font-bold p-4 rounded-b-[1.5rem] whitespace-normal break-words leading-snug pointer-events-none">
          {title}
        </div>
      </div>
    </div>
  );
}
