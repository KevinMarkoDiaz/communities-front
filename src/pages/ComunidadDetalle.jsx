import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import CommunityBusinessList from "../components/communities/CommunityBusinessList";
import CommunityEventList from "../components/communities/CommunityEventList";
import CommunityDescription from "../components/communities/CommunityDescription";
import CommunityLanguage from "../components/communities/CommunityLanguage";
import CommunityHero from "../components/communities/CommunityHero";

export default function ComunidadDetalle() {
  const { id } = useParams();
  const { lista } = useSelector((state) => state.comunidades);
  const negocios = useSelector((state) => state.negocios.lista);
  const eventos = useSelector((state) => state.eventos.lista);

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

  const negociosDeLaComunidad =
    comunidad.negocios && comunidad.negocios.length > 0
      ? comunidad.negocios
      : negocios.filter((n) => n.comunidad === comunidad.name);

  const eventosDeLaComunidad =
    comunidad.eventos && comunidad.eventos.length > 0
      ? comunidad.eventos
      : eventos.filter((e) => e.comunidad === comunidad.name);

  return (
    <>
      <Helmet>
        <title>Communities | {comunidad.name}</title>
        <meta
          name="description"
          content={`Información sobre ${comunidad.name}: ${comunidad.description}`}
        />
      </Helmet>

      <main className="flex-grow px-4 sm:px-8 lg:px-40 py-5 flex justify-center">
        <div className="w-full max-w-[960px] flex flex-col gap-8">
          <CommunityHero
            name={comunidad.name}
            flagImage={comunidad.flagImage}
            description={comunidad.description}
          />

          <CommunityDescription description={comunidad.description} />
          <CommunityLanguage language={comunidad.language} />

          {negociosDeLaComunidad.length > 0 && (
            <CommunityBusinessList negocios={negociosDeLaComunidad} />
          )}

          {eventosDeLaComunidad.length > 0 && (
            <CommunityEventList eventos={eventosDeLaComunidad} />
          )}
        </div>
      </main>
    </>
  );
}
