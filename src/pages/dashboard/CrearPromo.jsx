import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import authBg from "../../assets/authbg.png";
import logo2 from "../../assets/communidades_text.svg";
import icono from "../../assets/icono.svg";
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

  useEffect(() => {
    if (promociones.length === 0) {
      dispatch(fetchMisPromos());
    }
  }, [dispatch, promociones.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>
          {esEdicion ? "Editar Promoción" : "Crear Promoción"} | Communities
        </title>
      </Helmet>

      <section
        className="relative w-full max-w-5xl shadow-xl rounded-2xl p-6 sm:p-16 space-y-6 overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa semitransparente */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full"></div>

        {/* Contenido */}
        <div className="relative space-y-6 grid gap-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              {esEdicion ? "Editar Promoción" : "Crear Promoción"}
            </h1>
            <img src={logo2} alt="Communities Logo" className="h-6 w-auto" />
          </div>

          <p className="text-gray-700 text-sm sm:text-base">
            {esEdicion
              ? "Modifica los detalles de tu promoción para mantenerla actualizada y relevante."
              : "Comparte ofertas especiales y promociones exclusivas que ayuden a tu negocio a conectar con la comunidad latina 💫"}
          </p>

          {esEdicion ? (
            loading ? (
              <p className="text-gray-600">Cargando promoción...</p>
            ) : promo ? (
              <EditarPromoForm promo={promo} />
            ) : (
              <p className="text-red-500">No se encontró la promoción.</p>
            )
          ) : (
            <PromoForm />
          )}
        </div>
      </section>

      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
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
