import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";

import Compartir from "../components/Compartir";
import MapaNegocioDetalle from "../components/bussines/MapaNegocioDetalle";
import CardNegocioHome from "../components/communities/CardNegocioHome";
import CardEventoGrid from "../components/communities/CardEventoGrid";
import DetalleSkeleton from "../components/Skeleton/DetalleSkeleton";
import UniversalFollowButton from "../components/badges/UniversalFollowButton";
import axiosInstance from "../api/axiosInstance";

import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";
import { getBusinessesForMapByCommunity } from "../api/businessApi";

const socialIcons = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  whatsapp: <FaWhatsapp />,
  twitter: <FaTwitter />,
  website: <FaGlobe />,
  youtube: <FaYoutube />,
};

export default function ComunidadDetalle() {
  const { id } = useParams();
  const { lista, loading } = useSelector((state) => state.comunidades);
  const eventos = useSelector((state) => state.eventos.lista);
  const eventosLoading = useSelector((state) => state.eventos.loading);
  const coordsRedux = useSelector((state) => state.ubicacion.coords);

  const [negociosDeLaComunidad, setNegociosDeLaComunidad] = useState([]);
  const [negociosLoadingLocal, setNegociosLoadingLocal] = useState(true);

  const [yaSigue, setYaSigue] = useState(false);
  const [tab, setTab] = useState("negocios");

  const comunidad = useMemo(() => {
    return lista.find((c) => String(c.id) === id || String(c._id) === id);
  }, [lista, id]);

  useEffect(() => {
    const fetchFollow = async () => {
      if (!comunidad?._id) return;
      try {
        const res = await axiosInstance.get(
          "/users/me/following?type=community"
        );
        const ids = res.data.items.map((c) => String(c._id));
        setYaSigue(ids.includes(String(comunidad._id)));
      } catch (err) {
        console.warn("No se pudo cargar el estado de seguimiento:", err);
      }
    };
    fetchFollow();
  }, [comunidad?._id]);

  // ✅ NUEVO: traer negocios por comunidad via endpoint (mismo del mapa)
  useEffect(() => {
    const cargarNegocios = async () => {
      if (!comunidad?._id) return;
      try {
        setNegociosLoadingLocal(true);
        const data = await getBusinessesForMapByCommunity(
          comunidad._id,
          coordsRedux
        );
        setNegociosDeLaComunidad(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar negocios por comunidad:", err);
        setNegociosDeLaComunidad([]);
      } finally {
        setNegociosLoadingLocal(false);
      }
    };
    cargarNegocios();
  }, [comunidad?._id, coordsRedux]);

  const eventosDeLaComunidad = useMemo(() => {
    if (!comunidad?._id) return [];
    return eventos.filter((e) => {
      const porNombre = e.comunidad?.trim() === comunidad.name?.trim();
      const porIdPopulado = Array.isArray(e.communities)
        ? e.communities.some((c) => String(c._id) === String(comunidad._id))
        : false;
      return porNombre || porIdPopulado;
    });
  }, [eventos, comunidad]);

  if (loading) {
    return (
      <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[1400px]">
          <DetalleSkeleton />
        </div>
      </div>
    );
  }

  if (!comunidad) {
    return (
      <div className="p-4 text-center text-gray-600">
        <Helmet>
          <title>Communidades | Comunidad no encontrada</title>
        </Helmet>
        Comunidad no encontrada.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {comunidad.metaTitle || `Communities | ${comunidad.name}`}
        </title>
        <meta
          name="description"
          content={comunidad.metaDescription || comunidad.description}
        />
      </Helmet>

      <div className=" sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[1400px] flex flex-col gap-10">
          <div
            className="w-full h-56 sm:h-72 md:rounded-xl bg-cover bg-center shadow-md"
            style={{
              backgroundImage: `url(${
                comunidad.bannerImage || "/placeholder.jpg"
              })`,
            }}
          />

          <div className="space-y-4 m-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {comunidad.name || "Nombre no disponible"}
            </h1>
            {comunidad._id && (
              <UniversalFollowButton
                entityType="community"
                entityId={comunidad._id}
                initialFollowed={yaSigue}
              />
            )}
            <Compartir
              url={window.location.href}
              title={`Descubrí la comunidad \"${comunidad.name}\" en Communidades`}
              text={`Mirá esta comunidad: ${comunidad.name || ""} - ${
                comunidad.description?.slice(0, 100) || ""
              }...`}
            />
          </div>

          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-sans text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
              {comunidad.description || "Sin descripción disponible."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-gray-200 pt-4">
            {["negocios", "eventos", "puntos"].map((tabId) => (
              <button
                key={tabId}
                onClick={() => setTab(tabId)}
                className={`  text-xs px-3 py-2 rounded-t font-medium transition ${
                  tab === tabId
                    ? "bg-white border border-b-0 border-gray-200 text-gray-800"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tabId === "negocios"
                  ? "Negocios"
                  : tabId === "eventos"
                  ? "Eventos"
                  : "Puntos de encuentro"}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-6 m-2">
            {tab === "negocios" && (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  Negocios de la comunidad
                </h2>
                {negociosLoadingLocal ? (
                  <p className="text-xs text-gray-500">Cargando negocios...</p>
                ) : negociosDeLaComunidad.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
                    {negociosDeLaComunidad.map((neg) => (
                      <Link key={neg._id} to={`/negocios/${neg._id}`}>
                        <CardNegocioHome negocio={neg} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">
                    No hay negocios registrados todavía.
                  </p>
                )}
              </>
            )}

            {tab === "eventos" && (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  Eventos de la comunidad
                </h2>
                {eventosLoading ? (
                  <p className="  text-xs text-gray-500">Cargando eventos...</p>
                ) : eventosDeLaComunidad.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {eventosDeLaComunidad.map((ev) => (
                      <CardEventoGrid
                        key={ev._id}
                        title={ev.title}
                        subtitle={
                          ev.date
                            ? new Date(ev.date).toLocaleDateString()
                            : "Sin fecha"
                        }
                        image={ev.featuredImage}
                        to={`/eventos/${ev._id}`}
                        categories={ev.categories}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="  text-xs text-gray-500">
                    No hay eventos registrados todavía.
                  </p>
                )}
              </>
            )}

            {tab === "puntos" && (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  Puntos de encuentro y enlaces útiles
                </h2>

                {comunidad.externalLinks?.length > 0 ? (
                  <>
                    {/* FUNCIONES AUXILIARES */}
                    {["facebook", "instagram", "whatsapp", "otros"].map(
                      (tipo) => {
                        let grupo = [];

                        if (tipo === "otros") {
                          grupo = comunidad.externalLinks.filter(
                            (l) =>
                              l.type !== "facebook" &&
                              l.type !== "instagram" &&
                              l.type !== "whatsapp"
                          );
                        } else {
                          grupo = comunidad.externalLinks.filter(
                            (l) => l.type === tipo
                          );
                        }

                        if (grupo.length === 0) return null;

                        const icono =
                          tipo === "facebook" ? (
                            <FaFacebook className="text-blue-600" />
                          ) : tipo === "instagram" ? (
                            <FaInstagram className="text-pink-500" />
                          ) : tipo === "whatsapp" ? (
                            <FaWhatsapp className="text-green-500" />
                          ) : (
                            <FaGlobe className="text-gray-500" />
                          );

                        const titulo =
                          tipo === "facebook"
                            ? "Grupos que reúnen la comunidad en Facebook"
                            : tipo === "instagram"
                            ? "Perfiles de la comunidad en Instagram"
                            : tipo === "whatsapp"
                            ? "Grupos o chats de la comunidad en WhatsApp"
                            : "Otros enlaces útiles de la comunidad";

                        return (
                          <div key={tipo} className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                              <span className=" text-lg">{icono}</span>
                              <h3 className="text-md font-semibold text-gray-500">
                                {titulo}
                              </h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {grupo.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 shadow-sm"
                                >
                                  <div className=" text-lg text-back-600">
                                    {socialIcons[link.type] || <FaGlobe />}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-800  text-xs">
                                      {link.title}
                                    </h3>
                                    {link.description && (
                                      <p className="text-xs text-gray-500 line-clamp-2">
                                        {link.description}
                                      </p>
                                    )}
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </>
                ) : (
                  <p className="  text-xs text-gray-500">
                    No hay enlaces registrados para esta comunidad.
                  </p>
                )}

                {/* Redes sociales tipo chips */}
              </>
            )}
          </div>
          <p className="text-lg text-gray-900 font-bold">
            Conectá con los negocios que mueven tu comunidad.
          </p>
          <div className="overflow-hidden z-0 mt-8">
            <MapaNegocioDetalle
              logo=""
              negocios={negociosDeLaComunidad}
              communityName={comunidad?.name || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
}
