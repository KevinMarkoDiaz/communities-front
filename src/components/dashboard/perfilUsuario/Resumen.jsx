import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contarCategorias } from "../../../api/categoryApi";
import { contarNegocios } from "../../../api/businessApi";
import { contarEventos } from "../../../api/eventApi";
import { contarComunidades } from "../../../api/communityApi";

// Feather Icons
import { FiUsers, FiFolder, FiShoppingBag, FiCalendar } from "react-icons/fi";

export default function Resumen() {
  const navigate = useNavigate();
  const [resumenData, setResumenData] = useState({
    categorias: 0,
    negocios: 0,
    eventos: 0,
    comunidades: 0,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [categorias, negocios, eventos, comunidades] = await Promise.all([
          contarCategorias(),
          contarNegocios(),
          contarEventos(),
          contarComunidades(),
        ]);

        setResumenData({
          categorias,
          negocios,
          eventos,
          comunidades,
        });
      } catch (err) {
        console.error("Error al cargar resumen", err);
      }
    };

    cargarDatos();
  }, []);

  const resumen = [
    {
      label: "Tus comunidades",
      value: resumenData.comunidades,
      path: "/dashboard/comunidades",
      icon: FiUsers,
      color: "text-orange-500",
    },
    {
      label: "Tus categorías",
      value: resumenData.categorias,
      path: "/dashboard/categorias",
      icon: FiFolder,
      color: "text-purple-500",
    },
    {
      label: "Tus negocios",
      value: resumenData.negocios,
      path: "/dashboard/mis-negocios",
      icon: FiShoppingBag,
      color: "text-green-500",
    },
    {
      label: "Tus eventos",
      value: resumenData.eventos,
      path: "/dashboard/mis-eventos",
      icon: FiCalendar,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="bg-[#F7F7F7] p-4 md:p-6 rounded-2xl  h-full">
      <h3 className="text-[#141C24] text-lg font-bold leading-tight tracking-[-0.015em] pb-4">
        Resumen
      </h3>
      <div className=" grid gap-2">
        {resumen.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index}>
              <div
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white hover:shadow-sm rounded-xl transition"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm font-medium text-[#3F5374]">
                    {item.label}
                  </p>
                  <p className="text-xl font-semibold text-[#141C24]">
                    {item.value}
                  </p>
                </div>
              </div>
              {index !== resumen.length - 1 && (
                <hr className="border-t border-gray-200 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
