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

export default function PerfilPage() {
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.comunidades.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMisComunidades());
    dispatch(fetchMisNegocios());
    dispatch(fetchMisEventos());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-gray-500">Cargando usuario...</p>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8">
      <HeaderPerfil usuario={usuario} />

      {/* Primera fila */}
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <div className="w-full md:w-1/3">
          <Resumen />
        </div>
        <div className="w-full md:flex-1">
          <ResumenComunidades />
        </div>
      </div>

      {/* Segunda fila */}
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <div className="w-full md:w-1/2">
          <ResumenNegocios />
        </div>
        <div className="w-full md:w-1/2">
          <ResumenEventos />
        </div>
      </div>
    </div>
  );
}
