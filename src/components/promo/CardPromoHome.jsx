import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsGem } from "react-icons/bs";

export default function CardPromoHome({
  title,
  image,
  descuento,
  maxClaims,
  businessId, // 🆕 solo pasás el ID del negocio
  isPremium = false,
}) {
  const [isMobile, setIsMobile] = useState(false);

  // 🔍 Obtener logo del negocio desde Redux por ID
  const negocio = useSelector((state) =>
    state.negocios.lista?.find((n) => n._id === businessId)
  );
  const businessLogo = negocio?.profileImage;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isAgotado =
    maxClaims === 0 ||
    descuento === "0 disponibles" ||
    descuento?.includes("0 disponibles");

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

      {/* Icono Premium */}

      {/* Badge de cupón */}
      <div
        className={`m-4 transform  transition-all duration-900 text-xs md:  text-xs font-semibold text-center rounded-full py-1.5 px-4 self-center 
        ${
          isMobile
            ? "scale-105"
            : "group-hover:-translate-y-1 group-hover:scale-105"
        }
        ${
          isAgotado
            ? "text-red-700"
            : isPremium
            ? " bg-black shadow-[0_0_30px_20px_rgba(234,179,8,0.4)] text-green-300 "
            : " bg-white shadow-md text-green-700"
        }
      `}
      >
        {isAgotado ? "Cupones agotados" : descuento}
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
