// ✅ Vista reutilizable para tipo de promoción
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromos } from "../../store/promocionesSlice";

import BannerPromociones from "../../components/promo/BannerPromociones";
import CardPromoHome from "../../components/promo/CardPromoHome";

export default function VistaPromosPorTipo({
  titulo,
  descripcion,
  tipo,
  imagenBanner,
}) {
  const dispatch = useDispatch();
  const {
    lista: promociones,
    loading,
    error,
  } = useSelector((state) => state.promociones);

  useEffect(() => {
    if (!promociones || promociones.length === 0) {
      dispatch(fetchAllPromos());
    }
  }, [promociones, dispatch]);

  const promosFiltradas = Array.isArray(promociones)
    ? promociones.filter((p) => p.type === tipo)
    : [];

  return (
    <>
      <Helmet>
        <title>{titulo} | Communidades</title>
        <meta name="description" content={descripcion} />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-36">
        <BannerPromociones titulo={titulo} imagen={imagenBanner} />

        {loading && (
          <p className="text-center text-gray-500">Cargando promociones...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && promosFiltradas.length === 0 && (
          <p className="text-center text-gray-400 italic">
            No hay promociones disponibles por ahora.
          </p>
        )}

        {!loading && !error && promosFiltradas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 place-items-center">
            {promosFiltradas.map((promo) => (
              <CardPromoHome
                key={promo._id || promo.id}
                title={promo.titulo || promo.name}
                image={promo.imagenDestacada || promo.featuredImage}
                isNew={promo.type === "nuevos_lanzamientos" || promo.isNew}
                hasDiscount={
                  promo.type === "descuentos_imperdibles" || promo.hasDiscount
                }
                descuento={promo.descuento || "20"}
                isVerified={promo.isVerified || promo.verificado || false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
