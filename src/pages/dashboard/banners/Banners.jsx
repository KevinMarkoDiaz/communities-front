// src/pages/dashboard/banners/Banners.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import DashboardSectionHeader from "../../../components/dashboard/negocios/DashboardSectionHeader";
import SkeletonDashboardList from "../../../components/Skeleton/SkeletonDashboardList";
import { mostrarFeedback } from "../../../store/feedbackSlice";
import ilusta from "../../../assets/ilusta.svg";
import ilust1 from "../../../assets/ilust1.svg";
import { MdLocalOffer } from "react-icons/md";
import BannerCard from "./BannerCard";
import BannerDetalleAdmin from "./BannerDetalleAdmin";
import BannerFilters from "./components/BannerFilters";

function normalize(b) {
  const id = b._id || b.id;
  return { ...b, _id: id, id };
}

export default function Banners() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detalleRef = useRef(null);

  // Auth (no condicionar hooks)
  const { usuario } = useSelector((s) => s.auth);
  const isAdmin = usuario?.role === "admin";

  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPlacement = searchParams.get("placement") || "";
  const initialQ = searchParams.get("q") || "";
  const initialActiveOnly = searchParams.get("activeOnly") === "true";
  const initialStatus = searchParams.get("status") || "";

  // UI state
  const [placement, setPlacement] = useState(initialPlacement);
  const [q, setQ] = useState(initialQ);
  const [activeOnly, setActiveOnly] = useState(initialActiveOnly);
  const [status, setStatus] = useState(initialStatus);

  // Data state
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // debounce para q
  const [qDebounced, setQDebounced] = useState(initialQ);
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q), 350);
    return () => clearTimeout(t);
  }, [q]);

  const queryParams = useMemo(
    () => ({
      ...(placement ? { placement } : {}),
      ...(qDebounced ? { q: qDebounced } : {}),
      ...(activeOnly ? { activeOnly: true } : {}),
      ...(status ? { status } : {}),
    }),
    [placement, qDebounced, activeOnly, status]
  );

  const fetchBanners = async () => {
    if (!isAdmin) return;
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get("ads/banners", {
        params: queryParams,
        headers: { "Cache-Control": "no-cache" },
      });

      // Normaliza id/_id y ordena
      let list = (data?.banners ?? [])
        .map(normalize)
        .sort(
          (a, b) => +new Date(b.createdAt || 0) - +new Date(a.createdAt || 0)
        );

      // Fallbacks de filtros si el back aún no los soporta
      if (status) list = list.filter((b) => (b.status || "") === status);
      if (activeOnly) list = list.filter((b) => b.isActive);

      setBanners(list);

      // mantener selección si existe
      if (list.length > 0) {
        setSelectedBanner((prev) =>
          prev && list.find((b) => b._id === prev._id) ? prev : list[0]
        );
      } else {
        setSelectedBanner(null);
      }
    } catch (err) {
      setError("No se pudieron cargar los banners");
    } finally {
      setLoading(false);
    }
  };

  // Sync URL + fetch
  useEffect(() => {
    const sp = {};
    if (placement) sp.placement = placement;
    if (qDebounced) sp.q = qDebounced;
    if (activeOnly) sp.activeOnly = "true";
    if (status) sp.status = status;
    setSearchParams(sp, { replace: true });
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, qDebounced, activeOnly, status, isAdmin]);

  // Redirección si no es admin
  useEffect(() => {
    if (usuario && !isAdmin) {
      navigate("/");
    }
  }, [usuario, isAdmin, navigate]);

  const handleSelect = (banner) => {
    setSelectedBanner(banner);
    if (window.innerWidth < 768) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        detalleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`ads/banners/${id}`);
      dispatch(
        mostrarFeedback({ type: "success", message: "Banner eliminado" })
      );
      const next = banners.filter((b) => b._id !== id);
      setBanners(next);
      setSelectedBanner(next[0] || null);
    } catch (err) {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "No se pudo eliminar el banner",
        })
      );
    }
  };

  const reload = () => fetchBanners();

  const resetFilters = () => {
    setPlacement("");
    setQ("");
    setStatus("");
    setActiveOnly(false);
  };

  // Guard de acceso
  if (usuario && !isAdmin)
    return <div className="p-4 text-red-600">Acceso no autorizado</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      {/* Header + detalle (siempre visibles) */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 lg:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🧲"
            title="Banners / Ads"
            badge="Gestión de anuncios"
            description="Aprueba o rechaza banners enviados por usuarios, controla vigencia, límites y estado de publicación."
            illustration={ilusta}
          />
        </div>

        {selectedBanner && (
          <div
            ref={detalleRef}
            className="hidden md:flex flex-3 flex-col justify-center"
          >
            <BannerDetalleAdmin
              banner={selectedBanner}
              onDeleted={handleDelete}
              onUpdated={reload}
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus banners
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Sección de filtros + grid / ilustración (render condicional con skeleton) */}
      {loading ? (
        <div className="w-full">
          <SkeletonDashboardList />
        </div>
      ) : (
        <>
          {/* Filtros */}
          <BannerFilters
            q={q}
            setQ={setQ}
            placement={placement}
            setPlacement={setPlacement}
            status={status}
            setStatus={setStatus}
            activeOnly={activeOnly}
            setActiveOnly={setActiveOnly}
            onReset={resetFilters}
          />

          {/* Error local solo en esta sección */}
          {error && <div className="p-4 text-red-600">{error}</div>}

          {/* Grid / vacío */}
          {banners.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-5 py-16">
              <img src={ilust1} alt="Sin banners" className="w-40 opacity-90" />
              <p className="text-gray-600 text-sm md:text-base max-w-xs">
                No hay banners para los filtros seleccionados.
                <br />
                Cambia los filtros o crea uno nuevo.
              </p>
              <Link
                to="crear"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition"
              >
                Crear banner
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
              {banners.map((b) => (
                <div
                  key={b._id}
                  onClick={() => handleSelect(b)}
                  className="transition"
                >
                  <BannerCard
                    banner={b}
                    active={selectedBanner?._id === b._id}
                    onClick={() => handleSelect(b)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA crear */}
          <div className="flex justify-end">
            <Link
              to="crear"
              className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
            >
              <MdLocalOffer className="text-lg" />
              <p className="hidden md:block">Crear banner</p>
            </Link>
          </div>
        </>
      )}

      {/* Modal mobile (detalle) */}
      {showModal && selectedBanner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <BannerDetalleAdmin
              banner={selectedBanner}
              onDeleted={(id) => {
                setShowModal(false);
                handleDelete(id);
              }}
              onUpdated={() => {
                setShowModal(false);
                reload();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
