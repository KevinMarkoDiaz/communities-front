// src/pages/dashboard/MisEventos.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardEvento from "../../components/dashboard/evento/CardEvento";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import { fetchMisEventos, deleteEvento } from "../../store/eventosSlice";
import ilusta from "../../assets/ilusta.svg";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import EventoDetalleDashboard from "./detalle/EventoDetalleDashboard";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

export default function MisEventos() {
  const dispatch = useDispatch();
  const {
    lista: eventos,
    loading,
    error,
  } = useSelector((state) => state.eventos);

  const [selectedEvento, setSelectedEvento] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchMisEventos());
  }, [dispatch]);

  useEffect(() => {
    if (eventos?.length) {
      setSelectedEvento(eventos[0]);
    }
  }, [eventos]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEvento(id)).unwrap();
      const nuevos = eventos.filter((e) => e._id !== id);
      setSelectedEvento(nuevos[0] || null);
      setShowModal(false);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      alert("No se pudo eliminar el evento.");
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
            icon="🎉"
            title="Tus eventos"
            badge="Tu espacio de organización"
            description="Administra tus eventos, comparte novedades y conecta con tu comunidad."
            illustration={ilusta}
          />
        </div>
        <div className="hidden md:flex flex-3 flex-col justify-center">
          {selectedEvento ? (
            <EventoDetalleDashboard
              evento={selectedEvento}
              onDelete={(id) => setConfirmDeleteId(id)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ningún evento seleccionado.
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
          Tus eventos
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Cabecera de acciones */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de eventos
        </h3>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdAdd className="text-lg" />
          <span className="hidden md:block">Crear evento</span>
        </Link>
      </div>

      {/* Grid */}
      {eventos.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-12">
          <img
            src="/empty-state.svg"
            alt="Sin eventos"
            className="w-32 opacity-80"
          />
          <p className="text-gray-500">
            Aún no has creado ningún evento.
            <br />
            ¡Es momento de planificar algo especial!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {eventos.map((evento) => (
            <div
              key={evento._id}
              onClick={() => {
                setSelectedEvento(evento);
                if (window.innerWidth < 768) setShowModal(true);
              }}
              className={`transition rounded-lg cursor-pointer ${
                selectedEvento?._id === evento._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <CardEvento evento={evento} />
            </div>
          ))}
        </div>
      )}

      {/* Modal mobile */}
      {showModal && selectedEvento && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <EventoDetalleDashboard
              evento={selectedEvento}
              onClose={() => setShowModal(false)}
              onDelete={(id) => setConfirmDeleteId(id)}
            />
          </div>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {confirmDeleteId && selectedEvento && (
        <ConfirmDeleteModal
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={() => handleDelete(confirmDeleteId)}
          entityName={selectedEvento.title}
          title="¿Eliminar este evento?"
          description="Para confirmar, escribe el nombre exacto del evento:"
        />
      )}
    </div>
  );
}
