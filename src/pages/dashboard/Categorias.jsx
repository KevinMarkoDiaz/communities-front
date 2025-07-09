import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCategories, deleteCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import CardCategoria from "../../components/categoria/CardCategoria";
import { MdCategory } from "react-icons/md";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";

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
        console.error(err);
        setError("No se pudieron cargar las categorías");
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

  if (loading) return <SkeletonDashboardList />;

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-4 md:px-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mt-8 md:mt-12 xl:mt-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#141C24]">
          Categorías
        </h2>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdCategory className="text-lg" />
          Crear categoría
        </Link>
      </div>

      {/* Sin categorías */}
      {categorias.length === 0 && (
        <div className="flex flex-col items-center text-center gap-4 py-12">
          <img
            src="/empty-state.svg"
            alt="Sin categorías"
            className="w-32 opacity-80"
          />
          <p className="text-gray-500">
            Aún no has creado ninguna categoría.
            <br />
            ¡Comienza a organizarlas ahora!
          </p>
        </div>
      )}

      {/* Grid de categorías */}
      {categorias.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
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
