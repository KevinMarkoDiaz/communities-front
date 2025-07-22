import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdPublic } from "react-icons/md";
import { FaLanguage } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";
import MetricsDashboard from "../../../components/metrics/MetricsDashboard";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";

export default function DashboardCommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string" || id.length !== 24) {
      setError("ID de comunidad inválido");
      setLoading(false);
      return;
    }

    const fetchCommunity = async () => {
      try {
        const { data } = await axiosInstance.get(`/communities/${id}`);
        setComunidad(data?.community);

        const { data: summaryRes } = await axiosInstance.get(
          `/community-views/${id}/summary`
        );
        setSummaryData(summaryRes);
      } catch (err) {
        console.error(err);
        setError("Error al cargar la comunidad");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/communities/${id}`);
      navigate("/dashboard/comunidades");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la comunidad");
    }
  };

  if (loading) return <p className="p-4">Cargando comunidad...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!comunidad)
    return <p className="p-4 text-gray-600">Comunidad no encontrada.</p>;

  return (
    <div className="flex flex-col gap-6 px-4 pb-12 max-w-[1200px] w-full mx-auto">
      {/* CARD PRINCIPAL */}
      <div className="w-full flex flex-col lg:flex-row gap-6 bg-white rounded-3xl border border-gray-200 shadow p-6 lg:p-8 xl:p-10">
        {/* Imagen */}
        <div className="w-full lg:w-60 flex-shrink-0">
          <img
            src={
              comunidad.bannerImage ||
              comunidad.flagImage ||
              `https://cdn.usegalileo.ai/sdxl10/${comunidad._id}.png`
            }
            alt={comunidad.name}
            className="w-full h-40 lg:h-60 object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-extrabold text-[#141C24] leading-snug">
              {comunidad.name}
            </h2>
          </div>

          {comunidad.description && (
            <p className="text-gray-700 text-sm lg:text-base leading-relaxed whitespace-pre-line">
              {comunidad.description}
            </p>
          )}

          <div className="flex flex-col gap-2 text-xs text-gray-600 mt-1">
            {comunidad.region && (
              <span className="flex items-center gap-1">
                🌎 <span>Región: {comunidad.region}</span>
              </span>
            )}
            {comunidad.language && (
              <span className="flex items-center gap-1">
                <FaLanguage className="text-gray-500 text-sm" />
                <span>Idioma: {comunidad.language.toUpperCase()}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span>
              Actualizado: {new Date(comunidad.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ BOTONES - SIEMPRE DEBAJO */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-2">
        <Link
          to={`/dashboard/comunidades/${comunidad._id}/editar`}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
        >
          <MdEdit className="text-lg" />
          Editar comunidad
        </Link>

        <Link
          to={`/comunidades/${comunidad.slug || comunidad._id}`}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-orange-600 items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50 transition text-xs font-medium no-underline"
        >
          <MdPublic className="text-lg" />
          Ver perfil público
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="whitespace-nowrap flex shadow-md hover:shadow-lg text-white items-center justify-center gap-2 px-3 py-2 rounded border border-gray-300 bg-red-500 hover:bg-red-700 transition text-xs font-medium"
        >
          <MdDelete className="text-lg" />
          Eliminar comunidad
        </button>
      </div>

      {/* SECCIÓN DE MÉTRICAS */}
      <section className="bg-white border border-gray-200 rounded-3xl p-6 shadow space-y-4">
        <h3 className="text-xl font-bold text-[#141C24]">
          Métricas de la comunidad
        </h3>
        <p className="text-sm text-gray-500">
          Aquí puedes visualizar las estadísticas de visitas y actividad.
        </p>
        <MetricsDashboard
          entityId={id}
          entityType="community"
          summary={summaryData}
        />
      </section>

      {/* MODAL */}
      <ConfirmDeleteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        entityName={comunidad.name}
        title="Eliminar comunidad"
        description="Para confirmar, escribe el nombre exacto de la comunidad:"
      />
    </div>
  );
}
