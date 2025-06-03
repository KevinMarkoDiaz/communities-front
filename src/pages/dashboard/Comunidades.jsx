import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommunities, deleteCommunity } from "../../api/communityApi";
import { Link } from "react-router-dom";

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
      <div className="p-6 text-sm text-gray-500">Cargando comunidades...</div>
    );
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#141C24]">Comunidades</h2>
        <Link
          to="crear"
          className="bg-[#141C24] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1e2733] transition"
        >
          + Nueva comunidad
        </Link>
      </div>

      {comunidades.length === 0 ? (
        <p className="text-gray-600">No tenés comunidades registradas aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comunidades.map((com) => (
            <div
              key={com._id}
              className="rounded-xl border border-[#E4E9F1] bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#141C24] mb-1">
                {com.name}
              </h3>
              {com.flagImage && (
                <img
                  src={com.flagImage}
                  alt={com.name}
                  className="w-16 h-10 object-cover mb-2 rounded"
                />
              )}
              <p className="text-sm text-gray-600 mb-1">{com.description}</p>
              <p className="text-xs text-gray-500 mb-2">
                Idioma: {com.language}
              </p>
              {(usuario.role === "admin" || usuario._id === com.owner) && (
                <div className="flex gap-4 mt-3">
                  <Link
                    to={`/dashboard/comunidades/${com._id}/editar`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(com._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
