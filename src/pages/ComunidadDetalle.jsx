import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import Compartir from "../components/Compartir";
import MapaNegocioDetalle from "../components/bussines/MapaNegocioDetalle";
import CardNegocioHome from "../components/communities/CardNegocioHome";
import CardEventoGrid from "../components/communities/CardEventoGrid"; // Asegúrate de tener este componente
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";

export default function ComunidadDetalle() {
  const { id } = useParams();
  const { lista } = useSelector((state) => state.comunidades);
  const eventos = useSelector((state) => state.eventos.lista);
  const eventosLoading = useSelector((state) => state.eventos.loading);
  const negocios = useSelector((state) => state.negocios.lista);
  const negociosLoading = useSelector((state) => state.negocios.loading);

  const comunidad = lista.find(
    (c) => String(c.id) === id || String(c._id) === id
  );

  if (!comunidad) {
    return (
      <div className="p-4 text-center text-gray-600">
        <Helmet>
          <title>Communities | Comunidad no encontrada</title>
        </Helmet>
        Comunidad no encontrada.
      </div>
    );
  }

  // Negocios relacionados
  const negociosDeLaComunidad = useMemo(() => {
    return negocios.filter((n) => {
      if (!n.community) return false;
      if (typeof n.community === "object" && n.community._id) {
        return String(n.community._id) === String(comunidad._id);
      }
      return String(n.community) === String(comunidad._id);
    });
  }, [negocios, comunidad]);

  // Eventos relacionados
  const eventosDeLaComunidad = useMemo(() => {
    return eventos.filter((e) => {
      const porNombre = e.comunidad?.trim() === comunidad.name?.trim();
      const porIdPopulado = Array.isArray(e.communities)
        ? e.communities.some((c) => String(c._id) === String(comunidad._id))
        : false;
      return porNombre || porIdPopulado;
    });
  }, [eventos, comunidad]);

  const socialIcons = {
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    whatsapp: <FaWhatsapp />,
    twitter: <FaTwitter />,
    website: <FaGlobe />,
    youtube: <FaYoutube />,
  };

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

      <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[1400px] flex flex-col gap-16">
          {/* Banner */}
          <div
            className="w-full h-56 sm:h-72 rounded-xl bg-cover bg-center shadow-md"
            style={{ backgroundImage: `url(${comunidad.bannerImage})` }}
          />

          {/* Encabezado */}
          <div className="space-y-1">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-2xl font-bold text-gray-900">
                {comunidad.name}
              </h1>
              {comunidad.status && (
                <span className="flex items-center gap-2 w-fit px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  {comunidad.verified ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-700"></span>
                      </span>
                      Verificada
                    </>
                  ) : (
                    comunidad.status
                  )}
                </span>
              )}
            </div>
            {comunidad.region && (
              <p className="text-sm text-gray-500">
                Región: {comunidad.region}
              </p>
            )}
            {comunidad.tipo && (
              <p className="text-sm text-gray-500 capitalize">
                Tipo: {comunidad.tipo}
              </p>
            )}
            {comunidad.slug && (
              <p className="text-xs text-gray-400">Slug: {comunidad.slug}</p>
            )}
            <p className="text-xs text-gray-400">
              Actualizada el{" "}
              {new Date(comunidad.updatedAt).toLocaleDateString()}
            </p>

            <Compartir
              url={window.location.href}
              title={`Descubrí la comunidad "${comunidad.name}" en Communities`}
              text={`Mirá esta comunidad: ${
                comunidad.name
              } - ${comunidad.description?.slice(0, 100)}...`}
            />
          </div>

          {/* Descripción */}
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="font-sans text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
              {comunidad.description}
            </p>
          </div>

          {/* Negocios */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Negocios de la comunidad
            </h2>
            {negociosLoading ? (
              <p className="text-sm text-gray-500">Cargando negocios...</p>
            ) : negociosDeLaComunidad.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {negociosDeLaComunidad.map((neg) => (
                  <Link key={neg._id} to={`/negocios/${neg._id}`}>
                    <CardNegocioHome negocio={neg} />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No hay negocios registrados todavía.
              </p>
            )}
          </section>

          {/* Eventos */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Eventos de la comunidad
            </h2>
            {eventosLoading ? (
              <p className="text-sm text-gray-500">Cargando eventos...</p>
            ) : eventosDeLaComunidad.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eventosDeLaComunidad.map((ev) => (
                  <Link key={ev._id} to={`/eventos/${ev._id}`}>
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
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No hay eventos registrados todavía.
              </p>
            )}
          </section>

          {/* Redes sociales */}
          {comunidad.socialMediaLinks && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Redes sociales
              </h2>
              <div className="flex gap-3 flex-wrap">
                {Object.entries(comunidad.socialMediaLinks).map(
                  ([key, value]) =>
                    value && (
                      <a
                        key={key}
                        href={value}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200"
                      >
                        {socialIcons[key.toLowerCase()] || <FaGlobe />}
                        <span className="capitalize">{key}</span>
                      </a>
                    )
                )}
              </div>
            </div>
          )}

          {/* Mapa */}
          {comunidad.mapCenter?.lat && comunidad.mapCenter?.lng && (
            <MapaNegocioDetalle
              lat={comunidad.mapCenter.lat}
              lng={comunidad.mapCenter.lng}
              name={comunidad.name}
            />
          )}
        </div>
      </div>
    </>
  );
}
