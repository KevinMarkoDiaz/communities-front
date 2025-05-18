// src/pages/BusinessDetail.jsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { OwnerCard } from "../components/OwnerCard";
import { OpeningHoursList } from "../components/OpeningHoursList";
import { ContactCard } from "../components/ContactCard";
import BusinessHero from "../components/bussines/BusinessHero";
import { CommunityTags } from "../components/CommunityTags";

export default function BusinessDetail() {
  const { id } = useParams();
  const { lista } = useSelector((state) => state.negocios);
  const negocio = lista.find(
    (n) => String(n.id) === id || String(n._id) === id
  );

  if (!negocio) {
    return (
      <div className="p-4 text-center text-gray-600">
        <Helmet>
          <title>Communities | Negocio no encontrado</title>
        </Helmet>
        Negocio no encontrado.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Communities | {negocio.nombre}</title>
        <meta
          name="description"
          content={`Información sobre ${negocio.nombre}: ${negocio.descripcion}`}
        />
      </Helmet>

      <main className="flex-grow px-4 sm:px-8 lg:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[960px] flex flex-col gap-8">
          <BusinessHero
            title={negocio.nombre}
            imageUrl={
              negocio.imagenDestacada || "https://via.placeholder.com/960x400"
            }
          />

          <section className="space-y-2">
            <h2 className="text-2xl font-bold">{negocio.nombre}</h2>
            <p className="text-gray-700">{negocio.descripcion}</p>
            <p className="text-sm text-gray-500">
              Categoría: {negocio.categoria || "N/A"}
            </p>
          </section>

          <ContactCard contact={negocio.contacto} />
          <OpeningHoursList hours={negocio.horarios} />
          <OwnerCard owner={negocio.propietario} />
          <CommunityTags tags={[negocio.comunidad, ...negocio.etiquetas]} />
        </div>
      </main>
    </>
  );
}
