import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMisComunidades } from "../../store/comunidadesSlice";
import CardComunidad from "../../components/dashboard/perfilUsuario/CardComunidad";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import ilust1 from "../../assets/ilust1.svg";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import DetalleComunidad from "./detalle/DetalleComunidad";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";
import { mostrarFeedback } from "../../store/feedbackSlice";

export default function Comunidades() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { usuario } = useSelector((state) => state.auth);
  const { misComunidades, loadingMis, error } = useSelector(
    (state) => state.comunidades
  );

  // Solo permite acceso a admin o business_owner
  const isAdmin = ["admin", "business_owner"].includes(usuario?.role);
  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // Redirige al home si no tiene permiso
    }
  }, [isAdmin, navigate]);

  const [selectedComunidad, setSelectedComunidad] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const detalleRef = useRef(null);

  useEffect(() => {
    if (isAdmin && misComunidades.length === 0) {
      dispatch(fetchMisComunidades());
    }
  }, [dispatch, isAdmin, misComunidades.length]);

  useEffect(() => {
    if (misComunidades.length > 0 && !selectedComunidad) {
      setSelectedComunidad(misComunidades?.[0] ?? null);
    }
  }, [misComunidades, selectedComunidad]);

  const handleSelect = (com) => {
    setSelectedComunidad(com);
    if (window.innerWidth < 768) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        detalleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(
        mostrarFeedback({
          message: "Comunidad eliminada",
          type: "success",
        })
      );
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo eliminar la comunidad.",
          type: "success",
        })
      );
    }
  };

  if (!isAdmin) return null; // Protección por si no se redirige aún
  if (loadingMis) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      {/* Header y detalle */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 lg:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🌍"
            title="Tus comunidades"
            badge="Tu espacio de conexión"
            description="Aquí puedes gestionar, actualizar y compartir tus comunidades con el mundo."
            illustration={ilusta}
          />
        </div>

        {selectedComunidad && (
          <div
            ref={detalleRef}
            className="hidden md:flex flex-3 flex-col justify-center"
          >
            <DetalleComunidad
              comunidad={selectedComunidad}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus comunidades
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Cabecera acciones */}
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
      {misComunidades.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-5 py-16">
          <img src={ilust1} alt="Sin comunidades" className="w-40 opacity-90" />
          <p className="text-gray-600 text-sm md:text-base max-w-xs">
            Aún no has creado ninguna comunidad.
            <br />
            Comparte tu cultura, conecta personas y haz crecer tu red.
          </p>
          <Link
            to="/dashboard/mis-comunidades/crear"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            Crear mi primera comunidad
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {misComunidades.map((com) => (
            <div
              key={com._id}
              onClick={() => handleSelect(com)}
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
