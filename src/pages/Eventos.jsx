import { Helmet } from "react-helmet-async";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import GridWrapper from "../components/GridWrapper";
import { useEventos } from "../hooks/useEventos";
import SearchBar from "../components/SearchBar";
import BannerEvento from "../components/eventos/BannerEvento";
import { useRef, useEffect, useState } from "react";
import EventosProximos from "../components/home/EventosProximos";
import Pagination from "../components/Pagination";

export default function Eventos() {
  const { lista, loading, error, busqueda, setBusqueda } = useEventos(); // 🗒️ usar API más adelante
  const gridRef = useRef(null);

  // ✅ Estados para paginación local
  const [paginaActual, setPaginaActual] = useState(1);
  const eventosPorPagina = 12;

  // 🟩 Cuando tengas API, reemplazá por useState() + fetch
  /*
  const [eventos, setEventos] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  
  useEffect(() => {
    const fetchEventos = async () => {
      const res = await fetch(`/api/eventos?page=${paginaActual}&limit=${eventosPorPagina}&busqueda=${busqueda}`);
      const data = await res.json();
      setEventos(data.data);
      setTotalPaginas(data.pages);
    };
    fetchEventos();
  }, [paginaActual, busqueda]);
  */

  // ✅ Calcular paginación con los eventos actuales (mock)
  const totalPaginas = Math.ceil(lista.length / eventosPorPagina);
  const indexInicio = (paginaActual - 1) * eventosPorPagina;
  const indexFin = indexInicio + eventosPorPagina;
  const eventosPaginados = lista.slice(indexInicio, indexFin);

  // ✅ Reiniciar página cuando se cambia la búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

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

      <div className="w-full  2xl:max-w-[70%] mx-auto flex flex-col gap-20">
        <BannerEvento scrollToRef={gridRef} />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar eventos..."
        />

        <EventosProximos />

        {/* ✅ Grid paginado */}
        <GridWrapper ref={gridRef}>
          {eventosPaginados.map((evento) => (
            <Link
              to={`/eventos/${evento.id || evento._id}`}
              key={evento._id || evento.id}
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
                image={evento.image}
              />
            </Link>
          ))}

          {lista.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No hay eventos disponibles.
            </p>
          )}
        </GridWrapper>

        {/* ✅ Paginador visible solo si hay más de una página */}
        <Pagination
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={setPaginaActual}
        />
      </div>
    </>
  );
}
