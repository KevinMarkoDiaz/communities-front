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
      path: "/dashboard/mis-comunidades",
      icon: FiUsers,
      color: "text-orange-500 ",
    },
    {
      label: "Tus categorías",
      value: resumenData.categorias,
      path: "/dashboard/categorias",
      icon: FiFolder,
      color: "text-orange-500 ",
    },
    {
      label: "Tus negocios",
      value: resumenData.negocios,
      path: "/dashboard/mis-negocios",
      icon: FiShoppingBag,
      color: "text-orange-500 ",
    },
    {
      label: "Tus eventos",
      value: resumenData.eventos,
      path: "/dashboard/mis-eventos",
      icon: FiCalendar,
      color: "text-orange-500 ",
    },
  ];

  return (
    <div className="bg-[#F7F7F7] px-2 py-3 md:p-3 lg:p-6 rounded-2xl h-full">
      <h3 className="text-gray-600 text-md font-semibold leading-tight tracking-[-0.015em] pb-4">
        Resumen
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        {resumen.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="cursor-pointer flex flex-col bg-white border border-gray-200 rounded-lg p-2 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-sm ${item.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex xl:flex-col items-center justify-between gap-1">
                <p className="text-xs font-normal text-[#3F5374] whitespace-nowrap truncate">
                  {item.label}
                </p>
                <p className="text-md font-semibold mr-1  text-gray-500 whitespace-nowrap">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
