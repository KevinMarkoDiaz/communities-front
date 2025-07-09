import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HeaderPerfil from "../../components/dashboard/perfilUsuario/HeaderPerfil";
import Resumen from "../../components/dashboard/perfilUsuario/Resumen";
import ResumenComunidades from "../../components/dashboard/perfilUsuario/ResumenComunidades";
import { fetchMisComunidades } from "../../store/comunidadesSlice";
import ResumenNegocios from "../../components/dashboard/perfilUsuario/ResumenNegocios";
import ResumenEventos from "../../components/dashboard/perfilUsuario/ResumenEventos";
import { fetchMisNegocios } from "../../store/negociosSlice";
import { fetchMisEventos } from "../../store/eventosSlice";
import PerfilSkeleton from "../../components/Skeleton/PerfilSkeleton";

export default function PerfilPage() {
  const usuario = useSelector((state) => state.auth.usuario);
  const loadingComunidades = useSelector((state) => state.comunidades.loading);
  const loadingNegocios = useSelector((state) => state.negocios.loading);
  const loadingEventos = useSelector((state) => state.eventos.loading);

  const dispatch = useDispatch();

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
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
        <HeaderPerfil usuario={usuario} />
      </div>

      {/* Primera fila */}
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <div className="w-full md:w-1/3">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
            <Resumen />
          </div>
        </div>
        <div className="w-full md:flex-1">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
            <ResumenComunidades />
          </div>
        </div>
      </div>

      {/* Segunda fila */}
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <div className="w-full md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
            <ResumenNegocios />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm  h-full">
            <ResumenEventos />
          </div>
        </div>
      </div>
    </div>
  );
}
