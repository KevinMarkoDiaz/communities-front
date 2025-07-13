import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HeaderPerfil from "../../components/dashboard/perfilUsuario/HeaderPerfil";
import Resumen from "../../components/dashboard/perfilUsuario/Resumen";
import ResumenComunidades from "../../components/dashboard/perfilUsuario/ResumenComunidades";
import ResumenNegocios from "../../components/dashboard/perfilUsuario/ResumenNegocios";
import ResumenEventos from "../../components/dashboard/perfilUsuario/ResumenEventos";
import { fetchMisComunidades } from "../../store/comunidadesSlice";
import { fetchMisNegocios } from "../../store/negociosSlice";
import { fetchMisEventos } from "../../store/eventosSlice";
import PerfilSkeleton from "../../components/Skeleton/PerfilSkeleton";

export default function PerfilPage() {
  const usuario = useSelector((state) => state.auth.usuario);
  const loadingComunidades = useSelector((state) => state.comunidades.loading);
  const loadingNegocios = useSelector((state) => state.negocios.loading);
  const loadingEventos = useSelector((state) => state.eventos.loading);
  console.log(usuario);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("negocios"); // ✅ Por defecto "Mis negocios"

  useEffect(() => {
    dispatch(fetchMisComunidades());
    dispatch(fetchMisNegocios());
    dispatch(fetchMisEventos());
  }, [dispatch]);

  if (loadingComunidades || loadingNegocios || loadingEventos) {
    return <PerfilSkeleton />;
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 p-4 md:p-6">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <HeaderPerfil usuario={usuario} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pt-2">
        {[
          { id: "comunidades", label: "Mis comunidades" },
          { id: "negocios", label: "Mis negocios" },
          { id: "eventos", label: "Mis eventos" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-sm px-3 py-2 rounded-t font-medium transition ${
              tab === t.id
                ? "bg-white border border-b-0 border-gray-200 text-gray-800"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Una sola fila con dos columnas */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/3">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
            <Resumen />
          </div>
        </div>

        {/* Columna derecha con contenido dinámico */}
        <div className="w-full md:flex-1">
          {tab === "comunidades" && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
              <ResumenComunidades />
            </div>
          )}
          {tab === "negocios" && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
              <ResumenNegocios />
            </div>
          )}
          {tab === "eventos" && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
              <ResumenEventos />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
