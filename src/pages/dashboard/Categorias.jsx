import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import CardCategoria from "../../components/categoria/CardCategoria";
import { MdCategory } from "react-icons/md";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import DetalleCategoria from "./detalle/DetalleCategoria";
import { fetchCategorias } from "../../store/categoriasSlice";

export default function Categorias() {
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const {
    data: categorias = [],
    loading,
    error,
    loaded,
  } = useSelector((state) => state.categorias);

  useEffect(() => {
    if (usuario?.role === "admin" && !loaded) {
      dispatch(fetchCategorias());
    }
  }, [usuario, loaded, dispatch]);

  // Selecciona la primera si no hay ninguna seleccionada
  useEffect(() => {
    if (
      Array.isArray(categorias) &&
      categorias.length > 0 &&
      !selectedCategoria
    ) {
      setSelectedCategoria(categorias[0]);
    }
  }, [categorias, selectedCategoria]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar esta categoría?");
    if (!confirmar) return;

    try {
      await deleteCategory(id);
      const nuevas = categorias.filter((c) => c._id !== id);
      setSelectedCategoria(nuevas[0] || null);
      setShowModal(false);
      // Opcional: Actualizar desde backend si querés sincronizar
      // dispatch(fetchCategorias());
    } catch (err) {
      console.error("Error al eliminar categoría:", err);
      alert("No se pudo eliminar la categoría");
    }
  };

  if (loading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      {/* Header y detalle */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 lg:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🏷️"
            title="Tus categorías"
            badge="Tu espacio de organización"
            description="Crea, edita y organiza categorías para clasificar tu contenido."
            illustration={ilusta}
          />
        </div>

        {/* Detalle */}
        <div className="hidden md:flex flex-3 flex-col justify-center">
          {selectedCategoria ? (
            <DetalleCategoria categoria={selectedCategoria} />
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ninguna categoría seleccionada.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Haz clic en una tarjeta de la lista para ver detalles aquí.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus categorías
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Listado */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de categorías
        </h3>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdCategory className="text-lg" />

          <p className="hidden md:block">Crear categoría</p>
        </Link>
      </div>

      {categorias.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {categorias.map((cat) => (
            <div
              key={cat._id}
              onClick={() => {
                setSelectedCategoria(cat);
                if (window.innerWidth < 768) setShowModal(true);
              }}
              className={`transition rounded-lg cursor-pointer ${
                selectedCategoria?._id === cat._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-none"
              }`}
            >
              <CardCategoria categoria={cat} />
            </div>
          ))}
        </div>
      )}

      {/* Modal detalle mobile */}
      {showModal && selectedCategoria && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <DetalleCategoria
              categoria={selectedCategoria}
              onClose={() => setShowModal(false)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
