import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommunities, deleteCommunity } from "../../api/communityApi";
import { Link } from "react-router-dom";
import CardComunidad from "../../components/dashboard/perfilUsuario/CardComunidad";

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
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#141C24]">Mis comunidades</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
        >
          + Nueva comunidad
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
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
