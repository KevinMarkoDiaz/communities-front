import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CardEvento from "../../components/dashboard/evento/CardEvento";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import { fetchMisEventos, deleteEvento } from "../../store/eventosSlice"; // Cambia si tu thunk se llama diferente
import ilusta from "../../assets/ilusta.svg";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";

export default function MisEventos() {
  const dispatch = useDispatch();
  const {
    lista: eventos,
    loading,
    error,
  } = useSelector((state) => state.eventos);

  const [selectedEvento, setSelectedEvento] = useState(null);

  useEffect(() => {
    dispatch(fetchMisEventos());
  }, [dispatch]);

  useEffect(() => {
    if (eventos?.length) {
      setSelectedEvento(eventos[0]);
    }
  }, [eventos]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar este evento?");
    if (!confirmar) return;

    try {
      await dispatch(deleteEvento(id)).unwrap();
      const nuevos = eventos.filter((e) => e._id !== id);
      if (selectedEvento?._id === id) {
        setSelectedEvento(nuevos[0] || null);
      }
    } catch (err) {
      console.error("Error al eliminar evento:", err);
      alert("No se pudo eliminar el evento.");
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

        {/* Detalle */}
        <div className="flex-3 flex flex-col justify-center">
          {selectedEvento ? (
            <div className="flex flex-col gap-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px]">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Imagen */}
                <div className="w-full md:w-60 flex-shrink-0">
                  <img
                    src={selectedEvento.featuredImage}
                    alt={selectedEvento.title}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-4 justify-between">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
                    <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
                      {selectedEvento.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                    {selectedEvento.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedEvento.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/eventos/${selectedEvento._id}`}
                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-600 hover:text-orange-800 transition"
                  >
                    Ver detalle del evento
                  </Link>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                    <span>
                      Fecha:{" "}
                      {selectedEvento.date
                        ? new Date(selectedEvento.date).toLocaleDateString()
                        : "Sin fecha"}
                    </span>
                    {selectedEvento.location && (
                      <span>
                        {selectedEvento.location.address},{" "}
                        {selectedEvento.location.city}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ningún evento seleccionado.
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
          Tus eventos
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Grid de eventos */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
          {eventos.map((evento) => (
            <div
              key={evento._id}
              onClick={() => setSelectedEvento(evento)}
              className={`transition  rounded-xl cursor-pointer ${
                selectedEvento?._id === evento._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <CardEvento
                evento={evento}
                onDelete={() => handleDelete(evento._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
