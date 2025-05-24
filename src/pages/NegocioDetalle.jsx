import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Mock local temporal (reemplazar por API real si usás backend)
import negocios from "../data/negociosData";

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
    // Simular fetch con mock local
    const data = negocios.find((n) => n.id === Number(id));
    setNegocio(data);
    setLoading(false);
  }, [id]);

  if (loading) return <div className="p-4">Cargando negocio...</div>;
  if (!negocio)
    return <div className="p-4 text-red-600">Negocio no encontrado.</div>;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-40 py-5">
      {/* Imagen principal */}
      <BusinessHero
        title={negocio.nombre}
        imageUrl="https://cdn.usegalileo.ai/sdxl10/4ac6d9b7-194a-463d-b7a5-91be2c87dd15.png"
      />

      {/* Descripción */}
      <p className="text-lg text-[#181411]">{negocio.descripcion}</p>
      <BusinessCard
        image="https://cdn.usegalileo.ai/sdxl10/4ac6d9b7-194a-463d-b7a5-91be2c87dd15.png"
        category="Mexican"
        title="Modern Mexican Cuisine"
        description="Chef Carlos Salgado's modern Mexican cuisine is inspired by the flavors and traditions of his family's native state of Michoacán."
        highlight="2013 Michelin Star Recipient"
      />

      {/* Info extra */}
      <ContactCard contact={negocio.contacto} />
      <OpeningHoursList hours={negocio.horarios} />
      <PhotoGallery
        images={[
          "https://cdn.usegalileo.ai/sdxl10/27102898-b896-4b4d-9a78-02f3c57d59ce.png",
          "https://cdn.usegalileo.ai/sdxl10/165d77d4-a3e2-46c7-a8aa-03033f199c33.png",
          "https://cdn.usegalileo.ai/sdxl10/465aca94-974b-4ca0-a28f-b60337483476.png",
          "https://cdn.usegalileo.ai/sdxl10/fbb50c17-a54b-4eb9-9f50-9d9fef4771d5.png",
          "https://cdn.usegalileo.ai/sdxl10/27102898-b896-4b4d-9a78-02f3c57d59ce.png",
          "https://cdn.usegalileo.ai/sdxl10/165d77d4-a3e2-46c7-a8aa-03033f199c33.png",
          "https://cdn.usegalileo.ai/sdxl10/465aca94-974b-4ca0-a28f-b60337483476.png",
          "https://cdn.usegalileo.ai/sdxl10/fbb50c17-a54b-4eb9-9f50-9d9fef4771d5.png",
        ]}
      />

      <OwnerCard
        owner={{
          name: negocio.propietario.nombre,
          profileImage: negocio.propietario.imagen,
        }}
      />
      {negocio?.ubicacion?.coordenadas && (
        <MapaNegocioDetalle
          lat={negocio.ubicacion.coordenadas.lat}
          lng={negocio.ubicacion.coordenadas.lng}
          nombre={negocio.nombre}
        />
      )}
      <CommunityTags tags={negocio.etiquetas} />
    </div>
  );
}
