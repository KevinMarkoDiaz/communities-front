import { useSelector } from "react-redux";
import CardComunidad from "./CardComunidad";

export default function AccesoRapido() {
  const comunidades = useSelector((state) => state.comunidades.lista);

  if (!comunidades.length)
    return (
      <p className="px-4 text-sm text-gray-500">
        No hay comunidades disponibles aún.
      </p>
    );

  return (
    <div>
      <h3 className="text-[#141C24] text-2xl font-bold leading-tight px-4 pb-2 pt-5">
        Acceso Rápido
      </h3>
      <div className="flex flex-col gap-3 px-4">
        {comunidades.slice(0, 5).map((comunidad) => (
          <CardComunidad
            key={comunidad._id}
            id={comunidad._id}
            name={comunidad.name}
            description={comunidad.description}
            flagImage={comunidad.flagImage}
            language={comunidad.language}
            owner={comunidad.owner}
            usuario={{}} // si no es necesario para esta vista, puede ir vacío
          />
        ))}
      </div>
    </div>
  );
}
