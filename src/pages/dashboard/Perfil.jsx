import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HeaderPerfil from "../../components/dashboard/perfilUsuario/HeaderPerfil";
import Resumen from "../../components/dashboard/perfilUsuario/Resumen";
import AccesoRapido from "../../components/dashboard/perfilUsuario/AccesoRapido";
import { fetchMisComunidades } from "../../store/comunidadesSlice";

export default function PerfilPage() {
  const usuario = useSelector((state) => state.auth.usuario);
  const loading = useSelector((state) => state.comunidades.loading); // loading viene del slice de comunidades
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMisComunidades());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-gray-500">Cargando usuario...</p>;

  return (
    <div className="max-w-[960px] w-full mx-auto flex flex-col">
      <HeaderPerfil usuario={usuario} />
      <Resumen />
      <AccesoRapido />
    </div>
  );
}
