import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories, deleteCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  useEffect(() => {
    if (usuario.role !== "admin") {
      setError("Acceso no autorizado");
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const res = await getAllCategories();
        setCategorias(res.categories);
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
      await deleteCategory(id, token);
      setCategorias((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
      alert("No se pudo eliminar la categoría");
    }
  };

  if (loading) return <div className="p-4">Cargando categorías...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#141C24]">Categorías</h2>
        <Link
          to="crear"
          className="bg-[#141C24] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#1e2733] transition"
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
              className="rounded-xl border border-[#E4E9F1] bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#141C24] mb-1">
                {cat.name}
              </h3>
              {cat.icon && (
                <p className="text-sm text-gray-500 mb-1">
                  Icono: <code>{cat.icon}</code>
                </p>
              )}
              <p className="text-sm text-gray-600">{cat.description}</p>
              <div className="mt-4 flex gap-4">
                <Link
                  to={`/dashboard/categorias/${cat._id}/editar`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
