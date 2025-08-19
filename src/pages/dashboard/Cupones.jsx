import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMisPromos } from "../../store/userPromosSlice";
import { FaCheckCircle, FaRegCopy } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { mostrarFeedback } from "../../store/feedbackSlice";
import ilust2 from "../../assets/ilust2.svg";
import ilusta from "../../assets/ilusta.svg";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import { Link } from "react-router-dom";

export default function Cupones() {
  const dispatch = useDispatch();
  const { lista, loading, error } =
    useSelector((state) => state.userPromos) || {};

  const [promoActiva, setPromoActiva] = useState(null);

  useEffect(() => {
    try {
      dispatch(fetchMisPromos());
    } catch {
      // el slice debería manejar errores; esto es ultra defensivo
    }
  }, [dispatch]);

  // Normaliza cualquier forma de "lista" a un array
  const listaSegura = useMemo(() => {
    if (Array.isArray(lista)) return lista;
    if (Array.isArray(lista?.data)) return lista.data;
    if (lista && typeof lista === "object") {
      const plausible = Object.values(lista).find((v) => Array.isArray(v));
      if (Array.isArray(plausible)) return plausible;
    }
    return [];
  }, [lista]);

  const handleCopy = async (e, code) => {
    e.stopPropagation(); // evitar abrir modal
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(String(code ?? ""));
      } else {
        // Fallback: crea un input temporal
        const temp = document.createElement("input");
        temp.value = String(code ?? "");
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      dispatch(mostrarFeedback({ message: "Código copiado", type: "success" }));
    } catch {
      dispatch(
        mostrarFeedback({
          message: "No se pudo copiar el código",
          type: "error",
        })
      );
    }
  };

  const handleOpenModal = (promo) => {
    if (!promo || !promo.promotion) return;
    setPromoActiva(promo);
  };
  const handleCloseModal = () => setPromoActiva(null);

  // Helper de lectura segura
  const safeDate = (d) => {
    try {
      const dt = new Date(d);
      return isNaN(dt) ? null : dt.toLocaleDateString();
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      <Helmet>
        <title>Mis Cupones | Communities</title>
      </Helmet>

      <DashboardSectionHeader
        icon="🎁"
        title="Tus cupones"
        badge="Promociones guardadas"
        description="Aquí podrás ver todas las promociones que has guardado con tu cuenta y sus respectivos códigos de uso."
        illustration={ilusta}
      />

      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus códigos
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {loading && <p className="text-gray-500">Cargando cupones...</p>}
      {!loading && error && <p className="text-red-500">{String(error)}</p>}

      {!loading && listaSegura.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-5 py-16">
          <img src={ilust2} alt="Sin cupones" className="w-40 opacity-90" />
          <p className="text-gray-600  text-xs md:text-base max-w-xs">
            Aún no has guardado ningún cupón. <br /> Explorá promociones y
            guardá tus favoritas para redimirlas luego.
          </p>
        </div>
      ) : (
        !loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-4 md:gap-6 xl:gap-8">
            {listaSegura.map((item) => {
              if (!item || typeof item !== "object") return null;

              const _id =
                item._id ??
                item.id ??
                `${item.code ?? "promo"}-${Math.random()}`;
              const promotion = item.promotion ?? {};
              const code = item.code ?? "";
              const redeemed = Boolean(item.redeemed);
              const redeemedAt = safeDate(item.redeemedAt);

              const img = promotion.featuredImage || "/placeholder.jpg";
              const name = promotion.name || "Promoción";
              const description = promotion.description || "";
              const businessId =
                promotion.business?._id || promotion.businessId;

              return (
                <div
                  key={_id}
                  className="relative rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-gray-400 transition group h-65 sm:h-52 md:h-56 cursor-pointer"
                  onClick={() => handleOpenModal(item)}
                >
                  <img
                    src={img}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />

                  <div className="absolute inset-0 bg-black/60 z-10" />

                  <div className="relative z-20 p-4 h-full gap-2 flex flex-col justify-between text-white">
                    <div className="space-y-1 grid gap-3">
                      <h2 className="text-lg font-bold">{name}</h2>
                      {!!description && (
                        <p className="hidden md:block text-xs text-gray-200">
                          {description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-[#39ff1415] border border-[#39FF14] p-2 rounded-lg">
                        <span className="font-mono tracking-widest  text-xs text-white">
                          {code || "—"}
                        </span>
                        <button
                          onClick={(e) => handleCopy(e, code)}
                          className="text-white hover:text-[#aaffaa]"
                          title="Copiar código"
                          type="button"
                        >
                          <FaRegCopy />
                        </button>
                      </div>

                      <div className="  text-xs font-medium">
                        {redeemed ? (
                          <p className="text-green-400 flex items-center gap-1">
                            <FaCheckCircle className="text-green-300" />{" "}
                            Redimido{" "}
                            {redeemedAt && (
                              <span className="text-gray-300 text-xs ml-1">
                                ({redeemedAt})
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="text-yellow-400">⏳ No redimido</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Modal */}
      {promoActiva && promoActiva.promotion && (
        <div
          className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center px-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700  text-lg"
              type="button"
            >
              ×
            </button>

            <img
              src={promoActiva.promotion.featuredImage || "/placeholder.jpg"}
              alt={promoActiva.promotion.name || "Promo"}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg";
              }}
            />

            <div className="p-4 space-y-3">
              <h2 className="text-lg font-bold text-gray-800">
                {promoActiva.promotion.name || "Promoción"}
              </h2>
              {!!promoActiva.promotion.description && (
                <p className="text-gray-600  text-xs">
                  {promoActiva.promotion.description}
                </p>
              )}
              <div className="  text-xs text-gray-700">
                <span className="font-medium">Código: </span>
                <span className="font-mono px-2 py-1 rounded border border-[#2ecc71] bg-[#2ecc7115] text-[#2ecc71] tracking-wider">
                  {promoActiva.code || "—"}
                </span>
              </div>

              {promoActiva.promotion?.business?._id && (
                <Link
                  to={`/negocios/${promoActiva.promotion.business._id}`}
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded transition"
                >
                  Ver negocio
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
