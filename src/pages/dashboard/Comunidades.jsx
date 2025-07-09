import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCommunities, deleteCommunity } from "../../api/communityApi";
import { Link } from "react-router-dom";
import CardComunidad from "../../components/dashboard/perfilUsuario/CardComunidad";
import { MdGroups } from "react-icons/md";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";

export default function Comunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [selectedComunidad, setSelectedComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      {/* 🟢 Header + detalle */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10 md:mt-16">
        {/* Header */}
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🌍"
            title="Tus comunidades"
            badge="Tu espacio de conexión"
            description="Aquí puedes gestionar, actualizar y compartir tus comunidades con el mundo."
            illustration={ilusta}
          />
        </div>

        {/* Detalle comunidad */}
        <div className="flex-3 flex flex-col justify-center h-full">
          {selectedComunidad ? (
            <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 h-full">
              {/* Imagen */}
              <div className="w-full md:w-60 flex-shrink-0">
                <img
                  src={
                    selectedComunidad.bannerImage ||
                    selectedComunidad.flagImage ||
                    `https://cdn.usegalileo.ai/sdxl10/${selectedComunidad._id}.png`
                  }
                  alt={selectedComunidad.name}
                  className="w-full h-60 object-cover rounded-xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-4 justify-between">
                {/* Título y Etiquetas */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-extrabold text-[#141C24] tracking-tight leading-snug">
                    {selectedComunidad.name}
                  </h2>
                  {selectedComunidad.status && (
                    <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {selectedComunidad.status}
                    </span>
                  )}
                  {selectedComunidad.tipo && (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {selectedComunidad.tipo}
                    </span>
                  )}
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {selectedComunidad.description}
                </p>

                {/* Datos extra */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
                  {selectedComunidad.region && (
                    <span>
                      🌎 Región: <strong>{selectedComunidad.region}</strong>
                    </span>
                  )}
                  {selectedComunidad.capital && (
                    <span>
                      🏙️ Capital: <strong>{selectedComunidad.capital}</strong>
                    </span>
                  )}
                  {selectedComunidad.language && (
                    <span>
                      🗣️ Idioma:{" "}
                      <strong>
                        {selectedComunidad.language.toUpperCase()}
                      </strong>
                    </span>
                  )}
                </div>

                {/* Links sociales */}
                <div className="flex gap-3 mt-2 flex-wrap">
                  {selectedComunidad.facebook && (
                    <a
                      href={selectedComunidad.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs font-semibold hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                  {selectedComunidad.instagram && (
                    <a
                      href={selectedComunidad.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 text-xs font-semibold hover:underline"
                    >
                      Instagram
                    </a>
                  )}
                  {selectedComunidad.whatsapp && (
                    <a
                      href={selectedComunidad.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 text-xs font-semibold hover:underline"
                    >
                      WhatsApp
                    </a>
                  )}
                  {selectedComunidad.youtube && (
                    <a
                      href={selectedComunidad.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 text-xs font-semibold hover:underline"
                    >
                      YouTube
                    </a>
                  )}
                </div>

                {/* Ver comunidad */}
                <Link
                  to={`/comunidades/${selectedComunidad.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-600 hover:text-orange-800 transition"
                >
                  Ver perfil de la comunidad
                </Link>

                {/* Metadatos */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                  <span>
                    Creado:{" "}
                    {new Date(selectedComunidad.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Actualizado:{" "}
                    {new Date(selectedComunidad.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ninguna comunidad seleccionada.
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
          Tus comunidades
        </span>
        <hr className="flex-grow border-gray-200" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
          {comunidades.map((com) => (
            <div
              key={com._id}
              onClick={() => setSelectedComunidad(com)}
              className={`transition rounded-xl cursor-pointer ${
                selectedComunidad?._id === com._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-none"
              }`}
            >
              <CardComunidad
                id={com._id}
                name={com.name}
                description={com.description}
                flagImage={com.bannerImage}
                language={com.language}
                owner={com.owner}
                usuario={usuario}
                slug={com.slug}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
