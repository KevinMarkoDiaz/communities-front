import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Card from "../components/Card";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import CategoryCarousel from "../components/CategoryCarousel";
import { useNegocios } from "../hooks/useNegocios";
import SearchBar from "../components/SearchBar";
import { setBusqueda } from "../store/negociosSlice";
import { useDispatch, useSelector } from "react-redux";
import BannerNegocios from "../components/bussines/BannerNegocios";
import { useRef } from "react";
export default function Negocios() {
  const { negociosFiltrados, loading, error } = useNegocios();
  const dispatch = useDispatch();
  const busqueda = useSelector((state) => state.negocios.busqueda);

  const gridRef = useRef(null); // 👈 referencia al GridWrapper

  if (loading) return <Loading mensaje="Cargando negocios..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Communities | Negocios</title>
        <meta
          name="description"
          content="Explora negocios y servicios dentro de tu comunidad migrante."
        />
      </Helmet>
      <div className="w-full max-w-[95%] lg:max-w-[80%] xl:max-w-[70%] flex flex-col gap-32">
        <BannerNegocios scrollToRef={gridRef} />

        <div>
          <CategoryCarousel />
          <SearchBar
            value={busqueda}
            onChange={(text) => dispatch(setBusqueda(text))}
            placeholder="Buscar negocios..."
          />
        </div>

        <GridWrapper ref={gridRef}>
          {negociosFiltrados.map((negocio) => (
            <Link
              key={negocio.id || negocio._id}
              to={`/negocios/${negocio.id || negocio._id}`}
              className="flex-shrink-0"
            >
              <Card
                title={negocio.nombre}
                description={negocio.descripcion}
                image={negocio.imagenDestacada}
              />
            </Link>
          ))}

          {negociosFiltrados.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No se encontraron resultados.
            </p>
          )}
        </GridWrapper>
      </div>
    </>
  );
}
