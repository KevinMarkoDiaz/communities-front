import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories, deleteCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import CardCategoria from "../../components/categoria/CardCategoria";

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
        setCategorias(res.categories || res);
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
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#141C24]">Mis categorías</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
        >
          + Nueva categoría
        </Link>
      </div>

      {categorias.length === 0 ? (
        <p className="text-gray-600">No hay categorías registradas.</p>
      ) : (
        <div className="space-y-3">
          {categorias.map((cat) => (
            <CardCategoria
              key={cat._id}
              categoria={cat}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
