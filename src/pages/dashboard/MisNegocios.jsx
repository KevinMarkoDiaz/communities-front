import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardNegocio from "../../components/dashboard/negocios/CardNegocio";
import { deleteBusiness, getMyBusinesses } from "../../api/businessApi";
import { MdAddBusiness } from "react-icons/md";
import ilusta from "../../assets/ilusta.svg";
import NegocioDetalleDashboard from "./detalle/NegocioDetalleDashboard";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function MisNegocios() {
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocio, setSelectedNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    try {
      await deleteBusiness(id);
      const nuevos = negocios.filter((n) => n._id !== id);
      setNegocios(nuevos);
      if (selectedNegocio?._id === id) {
        setSelectedNegocio(nuevos[0] || null);
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      alert("No se pudo eliminar el negocio. Intenta más tarde.");
    }
  };

  if (loading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2 md:px-4 md:px-6">
      {/* Header y Detalle */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10 md:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🏪"
            title="Tus negocios"
            badge="Tu espacio de gestión"
            description="Administra tus negocios, comparte novedades y conecta con tu comunidad."
            illustration={ilusta}
          />
        </div>

        {/* Detalle en desktop */}
        <div className="hidden md:flex flex-3 flex-col justify-center">
          <NegocioDetalleDashboard
            negocio={selectedNegocio}
            onAskDelete={(neg) => {
              setSelectedNegocio(neg);
              setShowDeleteModal(true);
            }}
          />
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
          <p className="hidden md:block">Crear negocio</p>
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {negocios.map((negocio) => (
            <div
              key={negocio._id}
              onClick={() => {
                setSelectedNegocio(negocio);
                if (window.innerWidth < 768) setShowModal(true);
              }}
              className={`transition rounded-lg cursor-pointer ${
                selectedNegocio?._id === negocio._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <CardNegocio negocio={negocio} />
            </div>
          ))}
        </div>
      )}

      {/* Modal Mobile */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <NegocioDetalleDashboard
              negocio={selectedNegocio}
              onClose={() => setShowModal(false)}
              onAskDelete={(neg) => {
                setShowModal(false);
                setSelectedNegocio(neg);
                setShowDeleteModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Confirmar eliminar */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(selectedNegocio._id)}
          entityName={selectedNegocio.name}
          title="Eliminar negocio"
          description="Para confirmar, escribe el nombre exacto del negocio:"
        />
      )}
    </div>
  );
}
