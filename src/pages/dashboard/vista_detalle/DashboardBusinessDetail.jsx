import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdEdit, MdDelete, MdLocalOffer, MdPublic } from "react-icons/md";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";
import MetricsDashboard from "../../../components/metrics/MetricsDashboard";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { mostrarFeedback } from "../../../store/feedbackSlice";
import { useDispatch } from "react-redux";

export default function DashboardBusinessDetail() {
  const { id } = useParams();
  const [negocio, setNegocio] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("info");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  // 🔴 Manejo de eliminación
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/businesses/${id}`);
      window.location.href = "/dashboard/mis-negocios";
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Error al eliminar el negocio",
          type: "error",
        })
      );
    } finally {
      setDeleteModalOpen(false);
    }
  };

  // 🔵 Carga de datos del negocio + resumen
  useEffect(() => {
    const fetchBusinessAndSummary = async () => {
      try {
        const { data: negocioRes } = await axiosInstance.get(
          `/businesses/${id}`
        );
        setNegocio(negocioRes.business);

        const { data: summaryRes } = await axiosInstance.get(
          `/business-views/${id}/summary`
        );
        setSummaryData(summaryRes);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos del negocio.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessAndSummary();
  }, [id]);

  if (loading) return <p className="p-4">Cargando negocio...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!negocio) return null;

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full mx-auto ">
      {/* Tarjeta principal */}
      <div className="w-full flex flex-col lg:flex-row gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 lg:p-8 xl:p-10 border border-gray-200">
        {/* Imagen */}
        <div className="w-full lg:w-60 flex-shrink-0">
          <img
            src={
              negocio.featuredImage ||
              `https://cdn.usegalileo.ai/sdxl10/${negocio._id || "default"}.png`
            }
            alt={negocio.name}
            className="w-full h-40 lg:h-60 object-cover rounded-xl"
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Encabezado */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-800 leading-snug">
              {negocio.name}
            </h2>
            {negocio.isVerified && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                Verificado
              </span>
            )}
          </div>

          {/* Descripción */}
          <p className="text-gray-600  text-xs leading-relaxed whitespace-pre-line">
            {negocio.description}
          </p>

          {/* Etiquetas */}
          <div className="flex flex-wrap gap-2">
            {negocio.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {negocio?.categories?.length > 0 &&
              negocio.categories.map((cat) => (
                <span
                  key={cat._id}
                  className="inline-block bg-black text-white text-xs font-medium px-2 py-1 rounded-full"
                >
                  {cat.name}
                </span>
              ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-2 border-b border-gray-200">
            {[
              { id: "info", label: "Información" },
              { id: "horarios", label: "Horarios" },
              { id: "galeria", label: "Galería" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`  text-xs px-3 py-2 rounded-t font-medium transition ${
                  tab === t.id
                    ? "bg-white border border-b-0 border-gray-200 text-gray-800"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Contenido dinámico */}
          <div className="pt-2">
            {tab === "info" && (
              <div className="flex flex-col gap-2  text-xs text-gray-600">
                {negocio.location && (
                  <p>
                    Dirección: {negocio.location.address},{" "}
                    {negocio.location.city}, {negocio.location.state}
                  </p>
                )}
                {negocio.contact && (
                  <div className="flex flex-col gap-1">
                    {negocio.contact.phone && (
                      <span className="flex items-center gap-2">
                        <FaPhoneAlt className="text-gray-500" />
                        {negocio.contact.phone}
                      </span>
                    )}
                    {negocio.contact.email && (
                      <span className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" />
                        {negocio.contact.email}
                      </span>
                    )}
                    {negocio.contact.website && (
                      <a
                        href={negocio.contact.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 no-underline"
                      >
                        <FaGlobe className="text-gray-500" />
                        {negocio.contact.website}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {tab === "horarios" && negocio.openingHours?.length > 0 && (
              <ul className="w-full max-w-[400px] border border-gray-200 rounded overflow-hidden">
                {negocio.openingHours.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex justify-between px-3 py-2  text-xs ${
                      i % 2 === 0 ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <span className="text-gray-700">{h.day}</span>
                    <span className="text-gray-600">
                      {h.closed ? "Cerrado" : `${h.open} - ${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {tab === "galeria" && negocio.images?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {negocio.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt="Imagen galería"
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Metadatos */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span>
              Creado:{" "}
              {negocio.createdAt
                ? new Date(negocio.createdAt).toLocaleDateString()
                : "Sin fecha"}
            </span>
            <span>
              Actualizado:{" "}
              {negocio.updatedAt
                ? new Date(negocio.updatedAt).toLocaleDateString()
                : "Sin fecha"}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ Botones siempre en una fila aparte */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
        <Link
          to={`/negocios/${negocio._id}`}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
        >
          <MdPublic className="text-lg" />
          Ver perfil público
        </Link>
        <Link
          to={`/dashboard/mis-negocios/${negocio._id}/promos/nueva`}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
        >
          <MdLocalOffer className="text-lg" />
          Crear promoción
        </Link>
        <Link
          to={`/dashboard/mis-negocios/${negocio._id}/editar`}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
        >
          <MdEdit className="text-lg" />
          Editar negocio
        </Link>
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-white items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-red-500 hover:bg-red-700 transition text-xs font-medium"
        >
          <MdDelete className="text-lg" />
          Eliminar negocio
        </button>
      </div>

      {/* Sección de métricas */}
      <section className="bg-white md:border border-gray-200 rounded-2xl md:p-6 md:shadow space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Métricas</h3>
        <p className="  text-xs text-gray-500">
          Aquí puedes ver las estadísticas de visitas, seguidores y
          calificaciones.
        </p>
        <MetricsDashboard
          entityId={negocio._id}
          entityType="business"
          summary={summaryData}
        />
      </section>

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        entityName={negocio.name}
      />
    </div>
  );
}
