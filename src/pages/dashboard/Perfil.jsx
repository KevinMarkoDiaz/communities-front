import HeaderPerfil from "../../components/dashboard/perfilUsuario/HeaderPerfil";
import Resumen from "../../components/dashboard/perfilUsuario/Resumen";
import AccesoRapido from "../../components/dashboard/perfilUsuario/AccesoRapido";
import { useUsuarioMock } from "../../data/useUsuarioMock";

export default function PerfilPage() {
  const { usuario, loading } = useUsuarioMock(); // ✅ usar el mock completo

  if (loading) return <p className="p-6 text-gray-500">Cargando usuario...</p>;

  return (
    <div className="max-w-[960px] w-full mx-auto flex flex-col">
      <HeaderPerfil usuario={usuario} />
      <Resumen />
      <AccesoRapido />
    </div>
  );
}
