import { Helmet } from "react-helmet-async";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import GridWrapper from "../components/GridWrapper";
import { useEventos } from "../hooks/useEventos";
import SearchBar from "../components/SearchBar";
import BannerEvento from "../components/eventsHome/BannerEvento"; // ⬅️ asegurate de tener este componente

import { useRef } from "react";

export default function Eventos() {
  const { lista, loading, error, busqueda, setBusqueda } = useEventos();
  const gridRef = useRef(null); // ⬅️ para hacer scroll al grid

  if (loading) return <Loading mensaje="Cargando eventos..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Communities | Eventos</title>
        <meta
          name="description"
          content="Consulta eventos culturales y comunitarios relevantes para migrantes."
        />
      </Helmet>

      <div className="w-full max-w-[95%] lg:max-w-[80%] xl:max-w-[70%] mx-auto flex flex-col gap-20">
        <BannerEvento scrollToRef={gridRef} />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar eventos..."
        />

        <GridWrapper ref={gridRef}>
          {lista.map((evento) => (
            <Link
              to={`/eventos/${evento.id || evento._id}`}
              key={evento._id}
              className="flex-shrink-0"
            >
              <Card
                title={evento.title}
                description={`${evento.description} 📅 ${new Date(
                  evento.date
                ).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`}
                image={evento.imagenDestacada}
              />
            </Link>
          ))}
          {lista.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No hay eventos disponibles.
            </p>
          )}
        </GridWrapper>
      </div>
    </>
  );
}
