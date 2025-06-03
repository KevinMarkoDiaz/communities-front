import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories, deleteCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuario = useSelector((state) => state.auth.usuario);

  useEffect(() => {
    if (!usuario || usuario.role !== "admin") {
      setError("Acceso no autorizado");
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const res = await getAllCategories();
        setCategorias(res.categories || res); // Ajustable si cambia backend
      } catch (err) {
        setError("No se pudieron cargar las categorías");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [usuario]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar esta categoría?");
    if (!confirmar) return;

    try {
      await deleteCategory(id);
      setCategorias((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
      alert("No se pudo eliminar la categoría");
    }
  };

  if (loading)
    return <div className="p-4 text-gray-700">Cargando categorías...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <section className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Categorías
        </h2>
        <Link
          to="crear"
          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
        >
          + Nueva categoría
        </Link>
      </div>

      {categorias.length === 0 ? (
        <p className="text-gray-600">No hay categorías registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorias.map((cat) => (
            <div
              key={cat._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center gap-3">
                {cat.icon && <div className="text-2xl">{cat.icon}</div>}
                <h3 className="text-lg font-semibold text-gray-900">
                  {cat.name}
                </h3>
              </div>
              {cat.description && (
                <p className="text-sm text-gray-600 leading-snug">
                  {cat.description}
                </p>
              )}
              <div className="flex gap-4 text-sm pt-2">
                <Link
                  to={`/dashboard/categorias/${cat._id}/editar`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-500 hover:underline font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
