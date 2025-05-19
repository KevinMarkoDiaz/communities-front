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
      <BusinessHero title={negocio.nombre} imageUrl={negocio.imagenDestacada} />

      {/* Descripción */}
      <p className="text-lg text-[#181411]">{negocio.descripcion}</p>

      {/* Info extra */}
      <ContactCard contact={negocio.contacto} />
      <OpeningHoursList hours={negocio.horarios} />
      <OwnerCard
        owner={{
          name: negocio.propietario.nombre,
          profileImage: negocio.propietario.imagen,
        }}
      />
      <CommunityTags tags={negocio.etiquetas} />
    </div>
  );
}
