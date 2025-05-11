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
    if (!["admin", "business_owner"].includes(usuario.role)) {
      setError("Acceso no autorizado");
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const data = await getAllCommunities();
        setComunidades(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar comunidades");
      } finally {
        setLoading(false);
      }
    };

    cargar();
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

  if (loading) return <div className="p-4">Cargando comunidades...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Comunidades</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Nueva comunidad
        </Link>
      </div>

      {comunidades.length === 0 ? (
        <p className="text-gray-600">No hay comunidades registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comunidades.map((com) => (
            <div key={com._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-bold text-blue-700">{com.name}</h3>
              {com.flagImage && (
                <img
                  src={com.flagImage}
                  alt={com.name}
                  className="w-16 h-10 object-cover mt-2"
                />
              )}
              <p className="text-sm text-gray-600">{com.description}</p>
              <p className="text-xs text-gray-500">Idioma: {com.language}</p>
              {(usuario.role === "admin" || usuario._id === com.owner) && (
                <div className="mt-2 flex gap-2">
                  <Link
                    to={`/dashboard/comunidades/${com._id}/editar`}
                    className="text-blue-600 text-sm"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(com._id)}
                    className="text-red-600 text-sm hover:underline"
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
