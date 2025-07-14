// src/pages/dashboard/MisEventos.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardEvento from "../../components/dashboard/evento/CardEvento";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import { fetchMisEventos, deleteEvento } from "../../store/eventosSlice";
import ilusta from "../../assets/ilusta.svg";
import ilust4 from "../../assets/ilust4.svg";

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
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2 ">
      {/* Header y Detalle */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 lg:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🎉"
            title="Tus eventos"
            badge="Tu espacio de organización"
            description="Administra tus eventos, comparte novedades y conecta con tu comunidad."
            illustration={ilusta}
          />
        </div>
        {selectedEvento && (
          <div className="hidden md:flex flex-3 flex-col justify-center">
            <EventoDetalleDashboard
              evento={selectedEvento}
              onDelete={(id) => setConfirmDeleteId(id)}
            />
          </div>
        )}
        <div className="hidden md:flex flex-3 flex-col justify-center"></div>
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
        <div className="flex flex-col items-center text-center gap-5 py-16">
          <img src={ilust4} alt="Sin eventos" className="w-40 opacity-90" />
          <p className="text-gray-600 text-sm md:text-base max-w-xs">
            Aún no has creado ningún evento.
            <br />
            Publica tus actividades y conecta con tu comunidad fácilmente.
          </p>
          <Link
            to="/dashboard/mis-eventos/crear"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            Crear mi primer evento
          </Link>
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
