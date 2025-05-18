import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

export default function ComunidadDetalle() {
  const { id } = useParams();
  const { lista } = useSelector((state) => state.comunidades);

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

  return (
    <>
      <Helmet>
        <title>Communities | {comunidad.name}</title>
        <meta
          name="description"
          content={`Información sobre ${comunidad.name}: ${comunidad.description}`}
        />
      </Helmet>

      <div className="p-4 space-y-4">
        <h2 className="text-3xl font-bold text-blue-700">{comunidad.name}</h2>
        <img
          src={comunidad.flagImage}
          alt={`Bandera de ${comunidad.name}`}
          className="w-32 h-auto rounded shadow"
        />
        <p className="text-gray-700">{comunidad.description}</p>
        <p className="text-sm text-gray-500">
          Idioma principal: {comunidad.language}
        </p>
        {/* En el futuro: eventos, noticias o servicios de esta comunidad */}
      </div>
    </>
  );
}
