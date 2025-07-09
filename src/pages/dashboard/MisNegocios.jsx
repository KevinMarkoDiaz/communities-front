import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardNegocio from "../../components/dashboard/negocios/CardNegocio";
import { deleteBusiness, getMyBusinesses } from "../../api/businessApi";
import { MdAddBusiness } from "react-icons/md";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
export default function MisNegocios() {
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocio, setSelectedNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarNegocios = async () => {
      try {
        const data = await getMyBusinesses();
        setNegocios(data.businesses);
        if (data.businesses.length > 0) {
          setSelectedNegocio(data.businesses[0]);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los negocios");
      } finally {
        setLoading(false);
      }
    };
    cargarNegocios();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este negocio?"
    );
    if (!confirmar) return;

    try {
      await deleteBusiness(id);
      const nuevos = negocios.filter((n) => n._id !== id);
      setNegocios(nuevos);
      if (selectedNegocio?._id === id) {
        setSelectedNegocio(nuevos[0] || null);
      }
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      alert("No se pudo eliminar el negocio. Intenta más tarde.");
    }
  };

  if (loading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-4 md:px-6">
      {/* 🟢 Header y Detalle en fila */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10 md:mt-16">
        {/* Header */}
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🎉"
            title="Tus eventos"
            badge="Tu espacio de organización"
            description="Organiza tus eventos, comparte novedades y mantén informada a tu comunidad."
            illustration={ilusta}
          />
        </div>

        {/* Detalle o mensaje */}
        <div className="flex-3 flex flex-col justify-center">
          {selectedNegocio ? (
            <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px]">
              {/* Imagen */}
              <div className="w-full md:w-60 flex-shrink-0">
                <img
                  src={selectedNegocio.featuredImage}
                  alt={selectedNegocio.name}
                  className="w-full h-60 object-cover rounded-xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-4 justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
                    {selectedNegocio.name}
                  </h2>
                  {selectedNegocio.isVerified && (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      ✓ Verificado
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {selectedNegocio.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedNegocio.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {selectedNegocio?.category && (
                    <span className="inline-block bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
                      {selectedNegocio.category.name}
                    </span>
                  )}
                </div>

                <Link
                  to={`/negocios/${selectedNegocio._id}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-600 hover:text-orange-800 transition"
                >
                  {selectedNegocio.profileImage && (
                    <img
                      src={selectedNegocio.profileImage}
                      alt="Avatar negocio"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  Ver perfil del negocio
                </Link>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                  <span>
                    Creado:{" "}
                    {new Date(selectedNegocio.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Actualizado:{" "}
                    {new Date(selectedNegocio.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ningún negocio seleccionado.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Haz clic en una tarjeta de la lista para ver los detalles aquí.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus negocios
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Listado */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de negocios
        </h3>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdAddBusiness className="text-lg" />
          Crear negocio
        </Link>
      </div>

      {negocios.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-12">
          <img
            src="/empty-state.svg"
            alt="Sin negocios"
            className="w-32 opacity-80"
          />
          <p className="text-gray-500">
            Aún no has creado ningún negocio.
            <br />
            ¡Anímate a compartir tu proyecto!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
          {negocios.map((negocio) => (
            <div
              key={negocio._id}
              onClick={() => setSelectedNegocio(negocio)}
              className={`transition  rounded-xl cursor-pointer ${
                selectedNegocio?._id === negocio._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <CardNegocio
                negocio={negocio}
                onDelete={() => handleDelete(negocio._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
