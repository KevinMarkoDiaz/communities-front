import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contarCategorias } from "../../../api/categoryApi";
import { contarNegocios } from "../../../api/businessApi";
import { contarEventos } from "../../../api/eventApi";
import { contarComunidades } from "../../../api/communityApi";

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
      label: "Comunidades",
      value: resumenData.comunidades,
      path: "/dashboard/comunidades",
    },
    {
      label: "Categorías ",
      value: resumenData.categorias,
      path: "/dashboard/categorias",
    },
    {
      label: "Negocios",
      value: resumenData.negocios,
      path: "/dashboard/mis-negocios",
    },
    {
      label: "Eventos ",
      value: resumenData.eventos,
      path: "/dashboard/mis-eventos",
    },
  ];

  return (
    <div>
      <h3 className="text-[#141C24] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Resumen
      </h3>
      <div className="p-4 grid grid-cols-2 gap-4">
        {resumen.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all p-4 space-y-1"
          >
            <p className="text-[#3F5374] text-sm font-medium tracking-tight">
              {item.label}
            </p>
            <p className="text-[#141C24] text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
