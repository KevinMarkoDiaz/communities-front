import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommunities, deleteCommunity } from "../../api/communityApi";
import CardComunidad from "../../components/dashboard/perfilUsuario/CardComunidad";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import DetalleComunidad from "./detalle/DetalleComunidad";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [selectedComunidad, setSelectedComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        if (visibles.length > 0) {
          setSelectedComunidad(visibles[0]);
        }
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
      const nuevas = comunidades.filter((c) => c._id !== id);
      setComunidades(nuevas);
      if (selectedComunidad?._id === id) {
        setSelectedComunidad(nuevas[0] || null);
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error al eliminar comunidad:", err);
      alert("No se pudo eliminar la comunidad.");
    }
  };

  if (loading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-4 md:px-6">
      {/* Header y detalle */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10 md:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🌍"
            title="Tus comunidades"
            badge="Tu espacio de conexión"
            description="Aquí puedes gestionar, actualizar y compartir tus comunidades con el mundo."
            illustration={ilusta}
          />
        </div>

        <div className="hidden md:flex flex-3 flex-col justify-center">
          {selectedComunidad ? (
            <DetalleComunidad
              comunidad={selectedComunidad}
              onDelete={handleDelete}
            />
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ninguna comunidad seleccionada.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Haz clic en una tarjeta para ver detalles aquí.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus comunidades
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de comunidades
        </h3>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdGroups className="text-lg" />
          <p className="hidden md:block">Crear comunidad</p>
        </Link>
      </div>
      {/* Grid */}
      {comunidades.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-12">
          <img
            src="/empty-state.svg"
            alt="Sin comunidades"
            className="w-32 opacity-80"
          />
          <p className="text-gray-500">
            Aún no has creado ninguna comunidad.
            <br />
            ¡Empieza a compartir y conectar!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {comunidades.map((com) => (
            <div
              key={com._id}
              onClick={() => {
                setSelectedComunidad(com);
                if (window.innerWidth < 768) setShowModal(true);
              }}
              className={`transition rounded-lg cursor-pointer ${
                selectedComunidad?._id === com._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-none"
              }`}
            >
              <CardComunidad comunidad={com} />
            </div>
          ))}
        </div>
      )}

      {/* Modal mobile */}
      {showModal && selectedComunidad && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <DetalleComunidad
              comunidad={selectedComunidad}
              onClose={() => setShowModal(false)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
