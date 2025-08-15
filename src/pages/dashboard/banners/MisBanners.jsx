import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardSectionHeader from "../../../components/dashboard/negocios/DashboardSectionHeader";
import SkeletonDashboardList from "../../../components/Skeleton/SkeletonDashboardList";
import ilusta from "../../../assets/ilusta.svg";
import ilust1 from "../../../assets/ilust1.svg";
import { getMyAdBanners } from "../../../api/adsApi";
import { mostrarFeedback } from "../../../store/feedbackSlice";
import { crearSesionStripeBanner } from "../../../api/stripeApi";

function StatusPill({ status }) {
  const map = {
    submitted: "bg-yellow-100 text-yellow-800",
    under_review: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    awaiting_payment: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    rejected: "bg-gray-200 text-gray-800",
    archived: "bg-slate-200 text-slate-800",
  };
  const cls = map[status] || "bg-slate-100 text-slate-800";
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${cls}`}>
      {status || "—"}
    </span>
  );
}

/* 🔶 Card moderna: imagen protagonista en desktop, solo nombre + vigencia + estado */
function BannerCard({ banner, isHighlight, payingId, onPay }) {
  return (
    <div
      className={[
        "flex bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow",
        "h-24 md:h-32", // 🔒 Alto fijo (como antes)
        isHighlight ? "ring-2 ring-emerald-400" : "border border-gray-200",
      ].join(" ")}
    >
      {/* Imagen: ancho dinámico, alto fijo */}
      <div className="relative flex items-center bg-gray-50 shrink-0 px-3 md:px-4 border-r border-gray-200">
        {banner.imageUrl ? (
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="h-full w-auto object-contain max-w-[60vw] md:max-w-[40vw]" // ancho se adapta al banner
            loading="lazy"
          />
        ) : (
          <div className="h-full min-w-36 flex items-center justify-center text-xs text-gray-400">
            Sin imagen
          </div>
        )}
        {/* Estado sobre la imagen */}
        <div className="absolute top-2 left-2">
          <StatusPill status={banner.status} />
        </div>
      </div>

      {/* Detalle ajustado a la derecha */}
      <div className="flex-1 min-w-0 p-3 md:p-5 flex items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-3">
          <div className="min-w-0">
            <h3 className="  text-xs md:text-base font-semibold text-gray-900 truncate">
              {banner.title}
            </h3>
            <p className="text-xs md:  text-xs text-gray-600">
              Vigencia:{" "}
              {banner.startAt
                ? new Date(banner.startAt).toLocaleDateString()
                : "—"}{" "}
              –{" "}
              {banner.endAt ? new Date(banner.endAt).toLocaleDateString() : "—"}
            </p>
          </div>

          {(banner.status === "approved" ||
            banner.status === "awaiting_payment") && (
            <button
              onClick={() => onPay(banner._id)}
              disabled={!!payingId}
              className={[
                "inline-flex items-center justify-center gap-2 text-xs md:  text-xs px-3 py-2 rounded transition whitespace-nowrap",
                payingId
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-[#f4c753] hover:text-black",
              ].join(" ")}
            >
              {payingId === banner._id ? "Creando pago..." : "Pagar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MisBanners() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useSelector((s) => s.auth);

  const qs = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const highlightId = qs.get("bannerId");
  const checkoutStatus = qs.get("checkout"); // "success" | "cancel"

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { banners: list } = await getMyAdBanners();
      setBanners(list || []);
    } catch (e) {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "No se pudieron cargar tus banners",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial + feedback si venimos de checkout
  useEffect(() => {
    load();
    if (checkoutStatus === "success") {
      dispatch(
        mostrarFeedback({
          type: "success",
          message: "Pago completado correctamente",
        })
      );
      const u = new URL(window.location.href);
      u.searchParams.delete("checkout");
      u.searchParams.delete("bannerId");
      navigate(u.pathname, { replace: true });
    } else if (checkoutStatus === "cancel") {
      dispatch(mostrarFeedback({ type: "info", message: "Pago cancelado" }));
      const u = new URL(window.location.href);
      u.searchParams.delete("checkout");
      u.searchParams.delete("bannerId");
      navigate(u.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  const pay = async (id) => {
    try {
      setPayingId(id);
      const url = await crearSesionStripeBanner(id);
      if (url) {
        window.location.href = url;
      } else {
        dispatch(
          mostrarFeedback({
            type: "error",
            message: "No se pudo iniciar el pago",
          })
        );
      }
    } catch (e) {
      dispatch(
        mostrarFeedback({ type: "error", message: "Error creando checkout" })
      );
    } finally {
      setPayingId(null);
    }
  };

  if (!usuario) return <div className="p-4">Debes iniciar sesión</div>;
  if (loading) return <SkeletonDashboardList />;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 lg:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="📣"
            title="Tus banners"
            badge="Promociona y crece"
            description="Administra tus anuncios, revisa su estado y completa el pago cuando estén aprobados."
            illustration={ilusta}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Mis banners
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de banners
        </h3>
        <Link
          to="/dashboard/mis-banners/crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition  text-xs font-semibold"
        >
          <span className="text-md">➕</span>
          <p className="hidden md:block">Crear banner</p>
        </Link>
      </div>

      {/* Grid o vacío */}
      {banners.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-5 py-16">
          <img src={ilust1} alt="Sin banners" className="w-40 opacity-90" />
          <p className="text-gray-600  text-xs md:text-base max-w-xs">
            Aún no tienes banners.
            <br />
            Crea tu primer anuncio y empieza a darle visibilidad a tu marca.
          </p>
          <Link
            to="/dashboard/mis-banners/crear"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white  text-xs font-medium px-4 py-2 rounded transition"
          >
            Crear mi primer banner
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {banners.map((b) => {
            const isHighlight = Boolean(highlightId && b._id === highlightId);
            return (
              <BannerCard
                key={b._id}
                banner={b}
                isHighlight={isHighlight}
                payingId={payingId}
                onPay={pay}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
