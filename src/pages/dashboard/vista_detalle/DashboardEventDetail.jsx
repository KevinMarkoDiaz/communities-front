import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdPublic } from "react-icons/md";
import { HiOutlineClock, HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2";
import MetricsDashboard from "../../../components/metrics/MetricsDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMetrics } from "../../../store/metricsSlice";
import { deleteEvento } from "../../../store/eventosSlice";

export default function DashboardEventDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const evento = useSelector((state) =>
    state.eventos.misEventos.find((e) => e._id === id)
  );

  const summaryData = useSelector(
    (state) => state.metrics.entities[id]?.general || null
  );

  useEffect(() => {
    if (!summaryData) {
      dispatch(fetchMetrics({ entityType: "event", entityId: id }));
    }
  }, [dispatch, id, summaryData]);

  if (!evento) return <p className="p-4">Cargando evento...</p>;

  return (
    <div className="flex flex-col gap-6">
      {/* Card principal */}
      <div className="w-full flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200">
        {/* Imagen destacada */}
        <div className="w-full md:w-60 flex-shrink-0">
          <img
            src={evento.featuredImage}
            alt={evento.title}
            className="w-full h-40 md:h-60 object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-[#141C24] leading-snug">
            {evento.title}
          </h2>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {evento.description}
          </p>

          {/* Etiquetas */}
          {evento.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {evento.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <Link
            to={`/eventos/${evento._id}`}
            className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-orange-600 hover:text-orange-800 transition"
          >
            Ver detalle del evento
          </Link>

          {/* Metadatos */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <HiOutlineCalendarDays className="w-4 h-4" />
              <span>
                {evento.date
                  ? new Date(evento.date).toLocaleDateString()
                  : "Sin fecha"}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineClock className="w-4 h-4" />
              <span>{evento.time || "Sin hora"}</span>
            </span>
            {evento.location && (
              <span className="flex items-center gap-1">
                <HiOutlineMapPin className="w-4 h-4" />
                <span>
                  {evento.location.address}, {evento.location.city}
                </span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <HiOutlineDocumentText className="w-4 h-4" />
              <span>
                Creado: {new Date(evento.createdAt).toLocaleDateString()}
              </span>
            </span>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Link
              to={`/dashboard/mis-eventos/${evento._id}/editar`}
              className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
            >
              <MdEdit className="text-lg" />
              Editar evento
            </Link>
            <Link
              to={`/eventos/${evento._id}`}
              className="flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
            >
              <MdPublic className="text-lg" />
              Ver detalle del evento
            </Link>
            <button
              onClick={async () => {
                if (window.confirm("¿Estás seguro de eliminar este evento?")) {
                  await dispatch(deleteEvento(evento._id));
                  navigate("/dashboard/mis-eventos");
                }
              }}
              className="flex shadow-md hover:shadow-lg text-white items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-red-500 hover:bg-red-700 transition text-xs font-medium"
            >
              <MdDelete className="text-lg" />
              Eliminar evento
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE MÉTRICAS */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow space-y-4">
        <h3 className="text-xl font-bold">Métricas del evento</h3>
        <p className="text-sm text-gray-500">
          Aquí podrás visualizar estadísticas de visitas y engagement.
        </p>

        <MetricsDashboard
          entityId={id}
          entityType="event"
          summary={summaryData}
        />
      </section>
    </div>
  );
}
