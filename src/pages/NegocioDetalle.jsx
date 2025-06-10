import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBusinessById } from "../api/businessApi";

// Componentes reutilizables
import BusinessHero from "../components/bussines/BusinessHero";
import { CommunityTags } from "../components/bussines/CommunityTags";
import { ContactCard } from "../components/bussines/ContactCard";
import { OpeningHoursList } from "../components/bussines/OpeningHoursList";
import { OwnerCard } from "../components/bussines/OwnerCard";
import { BusinessCard } from "../components/bussines/BusinessCard";
import { PhotoGallery } from "../components/bussines/PhotoGallery";
import MapaNegocioDetalle from "../components/bussines/MapaNegocioDetalle";

export default function NegocioDetalle() {
  const { id } = useParams();
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const data = await getBusinessById(id);
        console.log("🧪 Negocio recibido:", data);
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

  if (loading) return <div className="p-4">Cargando negocio...</div>;
  if (!negocio)
    return <div className="p-4 text-red-600">Negocio no encontrado.</div>;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-40 py-5">
      {/* Imagen principal */}
      <BusinessHero
        businessName={negocio.name}
        backgroundImageUrl={negocio.featuredImage}
      />

      {/* Descripción */}
      <p className="text-lg text-[#181411]">{negocio.description}</p>

      {/* Tarjeta visual */}
      <BusinessCard
        imageUrl={negocio.profileImage}
        categoryName={negocio.category?.name}
        businessName={negocio.name}
        businessDescription={negocio.description}
        highlightText={negocio.isVerified ? "Verificado por Communities" : ""}
      />

      {/* Contacto */}
      {negocio.contact && <ContactCard contact={negocio.contact} />}

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

      {/* Mapa */}
      {negocio.location?.coordinates?.lat &&
        negocio.location?.coordinates?.lng && (
          <MapaNegocioDetalle
            lat={negocio.location?.coordinates?.lat}
            lng={negocio.location?.coordinates?.lng}
            name={negocio.name}
          />
        )}

      {/* Etiquetas */}
      {negocio.tags?.length > 0 && <CommunityTags tags={negocio.tags} />}
    </div>
  );
}
