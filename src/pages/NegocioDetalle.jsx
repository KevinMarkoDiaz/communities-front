import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessById } from "../api/businessApi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import BusinessHero from "../components/bussines/BusinessHero";
import { ContactCard } from "../components/bussines/ContactCard";
import { OpeningHoursList } from "../components/bussines/OpeningHoursList";
import { BusinessCard } from "../components/bussines/BusinessCard";
import { PhotoGallery } from "../components/bussines/PhotoGallery";
import MapaNegocioDetalle from "../components/bussines/MapaNegocioDetalle";
import Compartir from "../components/Compartir";
import DetalleSkeleton from "../components/Skeleton/DetalleSkeleton";

import UniversalFollowButton from "../components/badges/UniversalFollowButton";
import StartConversationButton from "../components/mensajes/StartConversationButton";
import CommentsSection from "../components/mensajes/CommentsSection";
import LikeButton from "../components/badges/LikeButton";
import StarRating from "../components/badges/StarRating";
import axiosInstance from "../api/axiosInstance";

export default function NegocioDetalle() {
  const { id } = useParams();
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("horarios");
  const [yaSigue, setYaSigue] = useState(false);

  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const data = await getBusinessById(id);
        setNegocio(data.business);

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
      } catch (error) {
        console.error("Error al cargar el negocio:", error);
        setNegocio(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNegocio();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[960px]">
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

  return (
    <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
      <div className="w-full max-w-[960px] flex flex-col gap-8">
        {/* Hero */}
        <BusinessHero
          businessName={negocio.name}
          backgroundImageUrl={negocio.featuredImage}
        />

        {/* Encabezado */}
        <div className="space-y-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{negocio.name}</h1>
            {negocio.isVerified && (
              <span className="flex items-center gap-2 w-fit px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-700"></span>
                </span>
                Verificado
              </span>
            )}
          </div>

          {/* Dirección */}
          {negocio.location?.address && (
            <p className="flex items-center text-sm text-gray-500 gap-2">
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
              {negocio.location.address}, {negocio.location.city},{" "}
              {negocio.location.state}
            </p>
          )}

          {/* Botones principales */}
          <div className="flex flex-wrap gap-2 mt-2">
            <UniversalFollowButton
              entityType="business"
              entityId={id}
              initialFollowed={yaSigue}
            />
            <StartConversationButton entityType="business" entityId={id} />
            <LikeButton
              targetType="business"
              targetId={id}
              initialLikes={negocio.likes}
            />
            <StarRating targetType="business" targetId={id} />
          </div>

          {/* Compartir */}
          <Compartir
            url={window.location.href}
            title={`Descubre ${negocio.name} en Communities`}
            text={`Encontré este negocio latino que te puede interesar: ${negocio.name}`}
          />
        </div>

        <hr className="border-t border-gray-200" />

        {/* Descripción */}
        <div className="border-l-4 border-gray-200 pl-4">
          <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-line">
            {negocio.description}
          </p>
        </div>

        {/* Card visual */}
        <BusinessCard
          imageUrl={negocio.profileImage}
          categoryName={negocio.category?.name}
          businessName={negocio.name}
          highlightText={negocio.isVerified ? "Verificado por Communities" : ""}
        />

        {negocio.category?.description && (
          <p className="text-sm text-gray-500 italic">
            {negocio.category.description}
          </p>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pt-4">
          {[
            { id: "horarios", label: "Horarios" },
            { id: "galeria", label: "Galería" },
            { id: "redes", label: "Redes Sociales" },
            { id: "contacto", label: "Contacto" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-sm px-3 py-2 rounded-t font-medium transition ${
                tab === t.id
                  ? "bg-white border border-b-0 border-gray-200 text-gray-800"
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
            <OpeningHoursList hours={negocio.openingHours} />
          )}
          {tab === "galeria" && negocio.images?.length > 0 && (
            <PhotoGallery galleryImages={negocio.images} />
          )}
          {tab === "redes" && negocio.contact?.socialMedia && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Redes sociales
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                {negocio.contact.socialMedia.instagram && (
                  <a
                    href={negocio.contact.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-600 transition"
                  >
                    <FaInstagram className="text-xl" />
                    Instagram
                  </a>
                )}
                {negocio.contact.socialMedia.facebook && (
                  <a
                    href={negocio.contact.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    <FaFacebook className="text-xl" />
                    Facebook
                  </a>
                )}
                {negocio.contact.socialMedia.twitter && (
                  <a
                    href={negocio.contact.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-sky-500 transition"
                  >
                    <FaTwitter className="text-xl" />
                    Twitter
                  </a>
                )}
                {negocio.contact.socialMedia.youtube && (
                  <a
                    href={negocio.contact.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-red-600 transition"
                  >
                    <FaYoutube className="text-xl" />
                    YouTube
                  </a>
                )}
                {negocio.contact.socialMedia.whatsapp && (
                  <a
                    href={negocio.contact.socialMedia.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-green-500 transition"
                  >
                    <FaWhatsapp className="text-xl" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          {tab === "contacto" && negocio.contact && (
            <ContactCard contact={negocio.contact} />
          )}
        </div>

        {/* Mapa y comunidad */}
        <div className="pt-6 flex flex-col gap-4">
          {negocio.community && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Comunidad relacionada
              </h2>
              <Link
                to={`/comunidades/${negocio.community._id}`}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
              >
                <img
                  src={negocio.community.flagImage || "/placeholder-flag.png"}
                  alt="bandera"
                  className="h-4 w-4 rounded-full object-cover"
                />
                {negocio.community.name}
              </Link>
            </div>
          )}
          {negocio.location?.coordinates?.lat &&
            negocio.location?.coordinates?.lng && (
              <MapaNegocioDetalle
                lat={negocio.location.coordinates.lat}
                lng={negocio.location.coordinates.lng}
                name={negocio.name}
              />
            )}
        </div>

        {/* Comentarios */}
        <CommentsSection targetType="business" targetId={id} />
      </div>
    </div>
  );
}
