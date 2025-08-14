// src/pages/dashboard/banners/MisBanners.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DashboardSectionHeader from "../../../components/dashboard/negocios/DashboardSectionHeader";
import SkeletonDashboardList from "../../../components/Skeleton/SkeletonDashboardList";
import ilusta from "../../../assets/ilusta.svg";
import ilust1 from "../../../assets/ilust1.svg";
import { getMyAdBanners, createAdCheckout } from "../../../api/adsApi";
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

export default function MisBanners() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((s) => s.auth);

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga inicial
  useEffect(() => {
    (async () => {
      try {
        const { banners: list } = await getMyAdBanners();
        setBanners(list || []);
      } catch {
        // noop
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pay = async (id) => {
    try {
      const url = await crearSesionStripeBanner(id, 1); // 1 mes
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
    }
  };

  if (!usuario) return <div className="p-4">Debes iniciar sesión</div>;
  if (loading) return <SkeletonDashboardList />;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      {/* Header (mismo estilo que Comunidades) */}
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

      {/* Cabecera acciones */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de banners
        </h3>
        <Link
          to="/dashboard/mis-banners/crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <span className="text-md">➕</span>
          <p className="hidden md:block">Crear banner</p>
        </Link>
      </div>

      {/* Grid o estado vacío con ilustración */}
      {banners.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-5 py-16">
          <img src={ilust1} alt="Sin banners" className="w-40 opacity-90" />
          <p className="text-gray-600 text-sm md:text-base max-w-xs">
            Aún no tienes banners.
            <br />
            Crea tu primer anuncio y empieza a darle visibilidad a tu marca.
          </p>
          <Link
            to="/dashboard/mis-banners/crear"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            Crear mi primer banner
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {banners.map((b) => (
            <div
              key={b._id}
              className="rounded-lg border border-gray-200 bg-white p-3 md:p-4 flex gap-3"
            >
              <div className="w-36 h-20 bg-gray-50 flex items-center justify-center rounded overflow-hidden shrink-0">
                {b.imageUrl ? (
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-xs text-gray-400 p-2">Sin imagen</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{b.title}</h3>
                  <StatusPill status={b.status} />
                </div>

                <div className="text-xs text-gray-600 truncate">
                  {b.placement} · Imp: {b.impressions ?? 0} · Clicks:{" "}
                  {b.clicks ?? 0}
                </div>

                <div className="text-xs text-gray-600">
                  Vigencia:{" "}
                  {b.startAt ? new Date(b.startAt).toLocaleDateString() : "—"} -{" "}
                  {b.endAt ? new Date(b.endAt).toLocaleDateString() : "—"}
                </div>

                {(b.status === "approved" ||
                  b.status === "awaiting_payment") && (
                  <button
                    onClick={() => pay(b._id)}
                    className="mt-2 inline-flex items-center gap-2 bg-black text-white text-sm px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition"
                  >
                    Pagar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
