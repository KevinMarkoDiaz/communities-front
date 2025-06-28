import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommunities, deleteCommunity } from "../../api/communityApi";
import { Link } from "react-router-dom";
import CardComunidad from "../../components/dashboard/perfilUsuario/CardComunidad";
import { MdGroups } from "react-icons/md";

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuario = useSelector((state) => state.auth.usuario);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!["admin", "business_owner"].includes(usuario?.role)) {
      setError("Acceso no autorizado");
      setLoading(false);
      return;
    }

    const cargarComunidades = async () => {
      try {
        const data = await getAllCommunities();
        const comunidadesArray = Array.isArray(data.communities)
          ? data.communities
          : [];
        const visibles =
          usuario.role === "admin"
            ? comunidadesArray
            : comunidadesArray.filter((c) => c.owner === usuario._id);

        setComunidades(visibles);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las comunidades.");
      } finally {
        setLoading(false);
      }
    };

    cargarComunidades();
  }, [usuario]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar esta comunidad?");
    if (!confirmar) return;

    try {
      await deleteCommunity(id, token);
      setComunidades((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error al eliminar comunidad:", err);
      alert("No se pudo eliminar la comunidad.");
    }
  };

  if (loading)
    return (
      <div className="p-4 text-sm text-gray-500">Cargando comunidades...</div>
    );
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#141C24]">Comunidades</h2>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-white text-black p-1 rounded hover:bg-black hover:text-white transition text-sm"
        >
          <MdGroups className="text-lg" />
          Agregar
        </Link>
      </div>

      {comunidades.length === 0 ? (
        <p className="text-gray-600">No tenés comunidades registradas aún.</p>
      ) : (
        <div className="space-y-3">
          {comunidades.map((com) => (
            <CardComunidad
              key={com._id}
              id={com._id}
              name={com.name}
              description={com.description}
              flagImage={com.flagImage}
              language={com.language}
              owner={com.owner}
              usuario={usuario}
              slug={com.slug}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
