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
        const data = await getAllCategories();
        setCategorias(data);
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
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Nueva categoría
        </Link>
      </div>

      {categorias.length === 0 ? (
        <p className="text-gray-600">No hay categorías registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <div key={cat._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              {cat.icon && <p className="text-sm">🔸 {cat.icon}</p>}
              <p className="text-sm text-gray-600">{cat.description}</p>
              <div className="mt-2 flex gap-2">
                <Link
                  to={`/dashboard/categorias/${cat._id}/editar`}
                  className="text-blue-600 text-sm"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-600 text-sm hover:underline"
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
