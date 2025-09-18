import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ilust2 from "../assets/ilust2.svg";

import CardLista from "../components/CardLista";
import GridWrapper from "../components/GridWrapper";
import CategoryCarousel from "../components/CategoryCarousel";
import BannerNegocios from "../components/bussines/BannerNegocios";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import Pagination from "../components/Pagination";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

import { obtenerNegocios } from "../store/negociosSlice";
import SkeletonNegocioCard from "../components/Skeleton/SkeletonNegocioCard";

export default function Negocios() {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const { coords } = useSelector((state) => state.ubicacion);
  const {
    lista: negocios,
    loading,
    error,
    currentPage,
    totalPages,
    categoria,
    busqueda,
    loaded,
  } = useSelector((state) => state.negocios);

  useEffect(() => {
    if (coords && !loaded) {
      dispatch(
        obtenerNegocios({
          page: 1,
          lat: coords.lat,
          lng: coords.lng,
        })
      );
    }
  }, [dispatch, coords, loaded]);

  const handlePageChange = (newPage) => {
    if (coords) {
      dispatch(
        obtenerNegocios({
          page: newPage,
          lat: coords.lat,
          lng: coords.lng,
        })
      );
    }
  };

  // 🔍 Filtro por categoría (local)
  const negociosFiltrados =
    categoria === "todas"
      ? negocios
      : negocios.filter((n) =>
          n.categories?.some(
            (cat) => (cat.name || "").toLowerCase() === categoria.toLowerCase()
          )
        );

  return (
    <div className="flex flex-col gap-4 md:gap-16 xl:gap-24 xl:mt-12 p-4">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communidades | Negocios</title>
        <meta
          name="description"
          content="Explora negocios y servicios dentro de tu comunidad migrante."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-4 md:gap-16 xl:gap-24">
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
          <NegociosSugeridos />

          <div>
            <h4 className=" text-lg md:text-lg font-bold text-black tracking-tight leading-snug md:my-4">
              Busca los negocios que te conectan con tu comunidad
            </h4>
            <BusquedaGlobalWrapper
              placeholder="Buscar negocios..."
              filtroTipo="negocio"
              onSelectResultado={(item) =>
                Navigate(`/negocios/${item._id || item.id}`)
              }
            />
          </div>

          <CategoryCarousel />
        </div>

        <div className="min-h-[70vh]">
          <GridWrapper ref={gridRef} tipo="grid">
            {loading ? (
              Array.from({ length: 15 }).map((_, i) => (
                <SkeletonNegocioCard key={i} />
              ))
            ) : negociosFiltrados.length > 0 ? (
              negociosFiltrados.map((negocio) => (
                <Link
                  key={negocio._id}
                  to={`/negocios/${negocio.slug || negocio._id}`} // ✅ slug preferido
                  className={`flex-shrink-0 ${
                    negocio.isPremium ? "col-span-2" : ""
                  }`}
                >
                  <CardLista
                    isPremium={negocio.isPremium}
                    title={negocio.name}
                    image={negocio.featuredImage}
                    isVerified={negocio.isVerified}
                    isNew={false}
                    hasDiscount={false}
                    descuento=""
                    logo={negocio.profileImage}
                    category={negocio.categories?.[0]?.name}
                    location={`${negocio.location?.city || ""}, ${
                      negocio.country || ""
                    }`}
                  />
                </Link>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-16 w-full">
                <div className="flex flex-col items-center text-center gap-5 max-w-sm w-full px-4">
                  <img
                    src={ilust2}
                    alt="Sin negocios"
                    className="w-32 md:w-60 xl:w-120 opacity-90"
                  />
                  <p className="text-gray-600  text-xs md:text-base xl: text-lg">
                    Ups... no encontramos ningún negocio en esta categoría
                    dentro de tu comunidad.
                    <br />
                    Quizás aún nadie ha dado el primer paso.
                  </p>
                  <Link
                    to="/dashboard/mis-negocios/crear"
                    className="inline-block shadow-2xl bg-orange-500 hover:bg-orange-600 text-white  text-xs font-medium px-4 py-2 xl: text-lg rounded-2xl transition"
                  >
                    ¿Tienes una buena idea para esta categoría? Publícala aquí
                  </Link>
                </div>
              </div>
            )}
          </GridWrapper>
        </div>

        {!loading && negociosFiltrados.length > 0 && (
          <Pagination
            totalPages={totalPages || 1}
            currentPage={currentPage || 1}
            onPageChange={handlePageChange}
            gridRef={gridRef}
          />
        )}

        <BannerNegocios scrollToRef={gridRef} />
      </div>
    </div>
  );
}
