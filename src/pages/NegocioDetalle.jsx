import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessById } from "../api/businessApi";
import { Helmet } from "react-helmet-async";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaShippingFast,
} from "react-icons/fa";
import BusinessHero from "../components/bussines/BusinessHero";
import { ContactCard } from "../components/bussines/ContactCard";
import { OpeningHoursList } from "../components/bussines/OpeningHoursList";
import { BusinessCard } from "../components/bussines/BusinessCard";
import { PhotoGallery } from "../components/bussines/PhotoGallery";
import Compartir from "../components/Compartir";
import DetalleSkeleton from "../components/Skeleton/DetalleSkeleton";

import UniversalFollowButton from "../components/badges/UniversalFollowButton";
import StartConversationButton from "../components/mensajes/StartConversationButton";
import CommentsSection from "../components/mensajes/CommentsSection";
import LikeButton from "../components/badges/LikeButton";
import StarRating from "../components/badges/StarRating";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import PromocionesRelacionadas from "../components/bussines/PromocionesRelacionadas";
import { estaAbiertoAhora } from "../utils/estaAbiertoAhora";
import { MdAccessTime, MdCheckCircle } from "react-icons/md";
import MapaNegocioDetalleUnico from "../components/bussines/MapaNegocioDetalleUnico";

// ✅ Nuevo: Badge azul para delivery
function DeliveryBadge({ zip }) {
  return (
    <span
      className="flex items-center w-fit gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                 bg-blue-100 text-blue-800 border border-blue-200"
      title={zip ? `Centro del ZIP ${zip}` : "Delivery disponible"}
    >
      <FaShippingFast className="text-blue-600" />
      Disponible para delivery{zip ? ` · ZIP ${zip}` : ""}
    </span>
  );
}

// ✅ Nuevo: Renderiza dirección o badge de delivery
function RenderLocation({ negocio }) {
  if (negocio.isDeliveryOnly) {
    return <DeliveryBadge zip={negocio.primaryZip} />;
  }

  const addr = negocio.location?.address;
  const city = negocio.location?.city;
  const state = negocio.location?.state;

  if (!addr && !city && !state) return null;

  return (
    <p className="flex items-center  text-xs text-gray-500 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13 21.314 8.343 16.657A8 8 0 1117.657 16.657z"
        />
      </svg>
      {addr ? `${addr}, ` : ""}
      {city ? `${city}, ` : ""}
      {state || ""}
    </p>
  );
}

function getCityFromCommunity(communityName = "") {
  // Busca "en XYZ"
  const parts = communityName.split(" en ");
  return parts.length > 1 ? parts[1] : communityName;
}

function BadgeEstadoNegocio({ openingHours }) {
  const abierto = estaAbiertoAhora(openingHours);

  return (
    <div
      className={`inline-flex items-center gap-2 p-3 rounded-xl  text-xs font-semibold shadow-md transition-all
        ${abierto ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
      `}
    >
      {abierto ? (
        <>
          <MdCheckCircle className="text-green-600  size-8" />
          <span className="text-gray-600 ">¡Abierto ahora!</span>
        </>
      ) : (
        <>
          <MdAccessTime className="text-red-600  size-8" />
          <span className="text-red-600 ">
            Estamos cerrados — consultá nuestros horarios para visitarnos
          </span>
        </>
      )}
    </div>
  );
}

export default function NegocioDetalle() {
  const usuario = useSelector((state) => state.auth.usuario);

  const { id } = useParams();
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("galeria");
  const [yaSigue, setYaSigue] = useState(false);

  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const data = await getBusinessById(id);
        setNegocio(data.business);

        if (usuario) {
          try {
            await axiosInstance.post(`/business-views/${id}/views`);
          } catch (err) {
            console.warn("⚠️ Error al registrar la vista:", err);
          }

          try {
            const resFollows = await axiosInstance.get(
              "/users/me/following?type=business"
            );
            const ids = resFollows.data.items.map((b) => b._id);
            setYaSigue(ids.includes(id));
          } catch (err) {
            console.warn("No se pudo cargar el estado de seguimiento:", err);
          }
        }
      } catch (error) {
        console.error("Error al cargar el negocio:", error);
        setNegocio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNegocio();
  }, [id, usuario]);

  if (loading) {
    return (
      <div className="px-4 sm:px-8 lg:px-8 w-[1240px] m-auto py-5 flex justify-center">
        <div className="w-full max-w-[1240px]">
          <DetalleSkeleton />
        </div>
      </div>
    );
  }

  if (!negocio) {
    return (
      <div className="p-4 text-center text-red-600">Negocio no encontrado.</div>
    );
  }
  const city = getCityFromCommunity(negocio.community?.name);
  const title = `${negocio.name} en ${city} | Communidades`;
  const url = `https://communidades.com/negocios/${negocio.slug}`;
  const description =
    negocio.description?.slice(0, 155) ||
    `Descubre ${negocio.name} en ${negocio.city}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": negocio.schemaType || "LocalBusiness",
    name: negocio.name,
    url: `https://communidades.com/negocios/${negocio.slug}`,
    image: negocio.featuredImage,
    telephone: negocio.phone,
    priceRange: negocio.priceRange || "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: negocio.location?.address,
      addressLocality: negocio.location?.city,
      addressRegion: negocio.location?.state || "TX",
      postalCode: negocio.location?.zip,
      addressCountry: "US",
    },
    geo: negocio.location?.coordinates?.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: negocio.location.coordinates.coordinates[1],
          longitude: negocio.location.coordinates.coordinates[0],
        }
      : undefined,
    openingHours: negocio.openingHours || [],
    sameAs: Object.values(negocio.contact?.socialMedia || {}).filter(Boolean),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        {/* Opcional: OG/Twitter para compartir */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={negocio.featuredImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="md:px-4 sm:px-8 lg:px-8 lg:py-5 flex justify-center">
        <div className="w-full max-w-[1240px] m-auto flex flex-col gap-8">
          {/* Hero */}
          <BusinessHero
            businessName={negocio.name}
            backgroundImageUrl={negocio.featuredImage}
          />
          {/* Card visual */}
          <BusinessCard
            sm={negocio?.contact?.socialMedia}
            imageUrl={negocio.profileImage}
            categoryName={negocio.categories?.[0]?.name}
            businessName={negocio.name}
            highlightText={
              negocio.isVerified ? "Verificado por Communidades" : ""
            }
          />
          {/* Encabezado */}
          <div className="lg:space-y-8">
            <div className="flex justify-between items-center flex-wrap ">
              <h1 className="hidden md:block text-2xl font-bold text-gray-900">
                {negocio.name}
              </h1>

              {/* Botones principales */}
              <div className="md:flex gap-2 hidden">
                <UniversalFollowButton
                  entityType="business"
                  entityId={id}
                  initialFollowed={yaSigue}
                />
                <StartConversationButton entityType="business" entityId={id} />
              </div>
            </div>

            {/* Dirección o Badge de delivery */}

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-100 lg:pt-4">
              {[
                { id: "horarios", label: "Horarios" },
                { id: "galeria", label: "Galería" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`  text-xs px-3 py-2 rounded-t font-medium transition ${
                    tab === t.id
                      ? "bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-600 border border-b-0 border-gray-100 text-gray-100"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Contenido dinámico */}
            <div className="pt-4 flex flex-col gap-4">
              {tab === "horarios" && negocio.openingHours?.length > 0 && (
                <>
                  {negocio.openingHours && (
                    <BadgeEstadoNegocio openingHours={negocio.openingHours} />
                  )}
                  <OpeningHoursList hours={negocio.openingHours} />
                </>
              )}
              {tab === "galeria" && negocio.images?.length > 0 && (
                <PhotoGallery galleryImages={negocio.images} />
              )}
            </div>
            <div className=" grid gap-4 md:gap-12 p-4">
              <RenderLocation negocio={negocio} />
              <Compartir
                url={window.location.href}
                title={`Descubre ${negocio.name} en Communidades`}
                text={`Encontré este negocio latino que te puede interesar: ${negocio.name}`}
              />
              <hr className="border-t border-gray-200" />

              {/* Descripción */}
              <div className="border-l-4 border-gray-200 pl-4">
                <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
                  {negocio.description}
                </p>
              </div>

              <PromocionesRelacionadas businessId={negocio._id} />

              {/* Mapa y comunidad */}
              <div className="pt-6 flex flex-col gap-4">
                {negocio.community && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      Comunidad relacionada
                    </h2>
                    <Link
                      to={`/comunidades/${
                        negocio.community.slug || negocio.community._id
                      }`}
                      className="w-fit flex items-center gap-2 p-2 rounded-full bg-gray-200 text-xs text-gray-700 hover:bg-gray-200"
                    >
                      <img
                        src={
                          negocio.community.flagImage || "/placeholder-flag.png"
                        }
                        alt="bandera"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      {negocio.community.name}
                    </Link>
                  </div>
                )}
                {Array.isArray(negocio.location?.coordinates.coordinates) &&
                  negocio.location.coordinates.coordinates.length === 2 && (
                    <MapaNegocioDetalleUnico
                      lat={
                        negocio?.location?.coordinates?.coordinates?.[1] ?? 0
                      }
                      lng={
                        negocio?.location?.coordinates?.coordinates?.[0] ?? 0
                      }
                      name={negocio?.name ?? "Sin nombre"}
                      logo={negocio?.profileImage ?? ""}
                    />
                  )}
              </div>

              {negocio.categories?.length > 0 && (
                <p className="  text-xs text-gray-500 italic">
                  {negocio.categories
                    .map((cat) => cat.description)
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              )}
              {/* Botones principales */}
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
                <div className="flex flex-wrap gap-2 md:w-full md:justify-between">
                  <LikeButton
                    targetType="business"
                    targetId={id}
                    initialLikes={negocio.likes}
                  />
                  <StarRating targetType="business" targetId={id} />
                </div>
              </div>
              {/* Comentarios */}
              <CommentsSection targetType="business" targetId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
