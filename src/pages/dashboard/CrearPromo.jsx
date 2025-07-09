import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import authBg from "../../assets/authbg.png";
import PromoForm from "./PromoForm";
import EditarPromoForm from "./EditarPromoForm";
import { getPromotionById } from "../../api/promotionApi";
import { fetchMisPromos } from "../../store/promocionesSlice";

export default function CrearPromo() {
  const { promoId } = useParams();
  const dispatch = useDispatch();
  const promociones = useSelector((state) => state.promociones.lista);
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(!!promoId);

  const esEdicion = Boolean(promoId);

  useEffect(() => {
    const cargarPromo = async () => {
      if (promoId) {
        // Buscar en Redux
        const encontrada = promociones.find((p) => p._id === promoId);
        if (encontrada) {
          setPromo(encontrada);
          setLoading(false);
        } else {
          try {
            const data = await getPromotionById(promoId);
            setPromo(data.promotion);
          } catch (err) {
            console.error("Error al cargar promoción:", err);
            alert("Error al cargar promoción");
          } finally {
            setLoading(false);
          }
        }
      }
    };

    cargarPromo();
  }, [promoId, promociones]);

  // Si no tienes promos cargadas en Redux, las traemos una sola vez
  useEffect(() => {
    if (promociones.length === 0) {
      dispatch(fetchMisPromos());
    }
  }, [dispatch, promociones.length]);

  return (
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>
          {esEdicion ? "Editar Promoción" : "Crear Promoción"} | Communities
        </title>
      </Helmet>

      <section
        className="w-full max-w-5xl shadow rounded-2xl p-6 sm:p-16 space-y-6"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#141C24]">
            {esEdicion ? "Editar Promoción" : "Crear Promoción"}
          </h1>
          <p className="text-gray-100 text-sm sm:text-base">
            {esEdicion
              ? "Modifica los detalles de tu promoción para mantenerla actualizada y relevante."
              : "Comparte ofertas especiales y promociones exclusivas que ayuden a tu negocio a conectar con la comunidad latina 💫"}
          </p>
        </div>

        {esEdicion ? (
          loading ? (
            <p className="text-white">Cargando promoción...</p>
          ) : promo ? (
            <EditarPromoForm promo={promo} />
          ) : (
            <p className="text-red-500">No se encontró la promoción.</p>
          )
        ) : (
          <PromoForm />
        )}
      </section>

      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          🎁{" "}
          {esEdicion
            ? "Mantén tus promociones al día y aumenta su impacto."
            : "Destaca tus productos y fortalece la identidad de tu comunidad."}
        </p>
        <p className="text-sm text-gray-600">
          {esEdicion
            ? "Actualizar tu promoción ayuda a tus clientes a conocer tus novedades."
            : "Cada promoción es una oportunidad de crecer juntos."}
        </p>
      </div>
    </div>
  );
}
