import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contarCategorias } from "../../../api/categoryApi";

export default function Resumen() {
  const navigate = useNavigate();
  const [conteoCategorias, setConteoCategorias] = useState(0);

  useEffect(() => {
    const cargarConteo = async () => {
      try {
        const total = await contarCategorias();
        setConteoCategorias(total);
      } catch (err) {
        console.error("Error al contar categorías", err);
      }
    };

    cargarConteo();
  }, []);

  const resumen = [
    { label: "Comunidades", value: 3, path: "/dashboard/comunidades" },
    {
      label: "Categorías Creadas",
      value: conteoCategorias,
      path: "/dashboard/categorias",
    },
    { label: "Negocios", value: 1, path: "/dashboard/mis-negocios" },
    { label: "Eventos Creados", value: 2, path: "/dashboard/mis-eventos" },
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
            className="cursor-pointer bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all p-4 space-y-1"
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
