import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessById } from "../api/businessApi";
import { getCommunityById } from "../api/communityApi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

// Componentes reutilizables
import BusinessHero from "../components/bussines/BusinessHero";
import { CommunityTags } from "../components/bussines/CommunityTags";
import { ContactCard } from "../components/bussines/ContactCard";
import { OpeningHoursList } from "../components/bussines/OpeningHoursList";
import { OwnerCard } from "../components/bussines/OwnerCard";
import { BusinessCard } from "../components/bussines/BusinessCard";
import { PhotoGallery } from "../components/bussines/PhotoGallery";
import MapaNegocioDetalle from "../components/bussines/MapaNegocioDetalle";
import Compartir from "../components/Compartir";

export default function NegocioDetalle() {
  const { id } = useParams();
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [communityData, setCommunityData] = useState(null);

  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const data = await getBusinessById(id);
        setNegocio(data.business);
      } catch (error) {
        console.error("Error al cargar el negocio:", error);
        setNegocio(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNegocio();
  }, [id]);

  useEffect(() => {
    if (negocio?.community) {
      setCommunityData(negocio.community);
    }
  }, [negocio?.community]);

  if (loading) return <div className="p-4">Cargando negocio...</div>;
  if (!negocio)
    return <div className="p-4 text-red-600">Negocio no encontrado.</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-8 xl:px-40 py-5 flex justify-center">
      <div className="w-full max-w-[960px] flex flex-col gap-8">
        {/* Imagen principal */}
        <BusinessHero
          businessName={negocio.name}
          backgroundImageUrl={negocio.featuredImage}
        />

        {/* Encabezado */}
        <div className="space-y-2">
          <div className="flex justify-between items-center w-full">
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
            <p className="flex items-center text-sm text-gray-600 gap-2">
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

        {/* Tarjeta visual */}
        <BusinessCard
          imageUrl={negocio.profileImage}
          categoryName={negocio.category?.name}
          businessName={negocio.name}
          highlightText={negocio.isVerified ? "Verificado por Communities" : ""}
        />

        {/* Categoría descripción */}
        {negocio.category?.description && (
          <p className="text-sm text-gray-500 italic">
            {negocio.category.description}
          </p>
        )}

        <hr className="border-t border-gray-200" />

        {/* Contacto */}
        {negocio.contact && <ContactCard contact={negocio.contact} />}

        {/* Redes sociales */}
        {negocio.contact?.socialMedia && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Redes sociales
            </h2>
            <div className="flex gap-4 text-2xl text-gray-600">
              {negocio.contact.socialMedia.instagram && (
                <a
                  href={negocio.contact.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600"
                >
                  <FaInstagram />
                </a>
              )}
              {negocio.contact.socialMedia.facebook && (
                <a
                  href={negocio.contact.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  <FaFacebook />
                </a>
              )}
              {negocio.contact.socialMedia.twitter && (
                <a
                  href={negocio.contact.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-500"
                >
                  <FaTwitter />
                </a>
              )}
              {negocio.contact.socialMedia.youtube && (
                <a
                  href={negocio.contact.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600"
                >
                  <FaYoutube />
                </a>
              )}
              {negocio.contact.socialMedia.whatsapp && (
                <a
                  href={negocio.contact.socialMedia.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>
          </div>
        )}

        <hr className="border-t border-gray-200" />

        {/* Horarios */}
        {negocio.openingHours?.length > 0 && (
          <OpeningHoursList hours={negocio.openingHours} />
        )}

        {/* Galería */}
        {negocio.images?.length > 0 && (
          <PhotoGallery galleryImages={negocio.images} />
        )}

        {/* Propietario */}
        {negocio.owner && (
          <OwnerCard
            owner={{
              name: `${negocio.owner.name} ${negocio.owner.lastName}`,
              profileImage: negocio.owner.profileImage,
            }}
          />
        )}

        {/* Comunidad relacionada */}
        {communityData && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Comunidad relacionada
            </h2>
            <div className="flex gap-2 flex-wrap">
              <Link
                to={`/comunidades/${communityData._id}`}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
              >
                <img
                  src={communityData.flagImage || "/placeholder-flag.png"}
                  alt="bandera"
                  className="h-4 w-4 rounded-full object-cover"
                />
                {communityData.name}
              </Link>
            </div>
          </div>
        )}

        <hr className="border-t border-gray-200" />

        {/* Mapa */}
        {negocio.location?.coordinates?.lat &&
          negocio.location?.coordinates?.lng && (
            <MapaNegocioDetalle
              lat={negocio.location.coordinates.lat}
              lng={negocio.location.coordinates.lng}
              name={negocio.name}
            />
          )}

        {/* Etiquetas */}
        {negocio.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {negocio.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
