// src/pages/dashboard/banners/BannerDetalleAdmin.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdDelete,
  MdEdit,
  MdCheckCircle,
  MdCancel,
  MdPlayCircle,
  MdContentCopy,
  MdOpenInNew,
} from "react-icons/md";
import axiosInstance from "../../../api/axiosInstance";
import {
  approveAdBanner,
  rejectAdBanner,
  createAdCheckout,
} from "../../../api/adsApi";
import { mostrarFeedback } from "../../../store/feedbackSlice";
import StatusPill from "./components/StatusPill";

function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return "—";
  return dt.toLocaleString();
}

export default function BannerDetalleAdmin({ banner, onDeleted, onUpdated }) {
  const dispatch = useDispatch();
  const { usuario } = useSelector((s) => s.auth);
  const isAdmin = usuario?.role === "admin";
  const [loading, setLoading] = useState(false);

  if (!banner) return null;

  const id = banner._id || banner.id;

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(id);
      dispatch(mostrarFeedback({ type: "success", message: "ID copiado" }));
    } catch {}
  };

  const openUrl = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleActive = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.put(`ads/banners/${id}`, {
        isActive: !banner.isActive,
      });
      dispatch(
        mostrarFeedback({
          type: "success",
          message: `Banner ${
            data?.banner?.isActive ? "activado" : "desactivado"
          }`,
        })
      );
      onUpdated?.();
    } catch (e) {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "No se pudo actualizar activo/inactivo",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const markUnderReview = async () => {
    try {
      setLoading(true);
      await axiosInstance.post(`ads/banners/${id}/under-review`);
      dispatch(
        mostrarFeedback({
          type: "success",
          message: "Marcado como 'en revisión'",
        })
      );
      onUpdated?.();
    } catch {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "No se pudo marcar 'en revisión'",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const approve = async () => {
    try {
      setLoading(true);
      await approveAdBanner(id);
      dispatch(
        mostrarFeedback({
          type: "success",
          message: "Aprobado. Se notificó al usuario.",
        })
      );
      onUpdated?.();
    } catch {
      dispatch(
        mostrarFeedback({ type: "error", message: "No se pudo aprobar" })
      );
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    const reason = prompt("Motivo del rechazo (opcional):") || "";
    try {
      setLoading(true);
      await rejectAdBanner(id, reason);
      dispatch(mostrarFeedback({ type: "success", message: "Rechazado" }));
      onUpdated?.();
    } catch {
      dispatch(
        mostrarFeedback({ type: "error", message: "No se pudo rechazar" })
      );
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    try {
      setLoading(true);
      const { url } = await createAdCheckout(id);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      else
        dispatch(
          mostrarFeedback({
            type: "error",
            message: "No se pudo crear checkout",
          })
        );
    } catch {
      dispatch(
        mostrarFeedback({ type: "error", message: "Error creando checkout" })
      );
    } finally {
      setLoading(false);
    }
  };

  const del = async () => {
    if (!confirm("¿Eliminar banner? Esta acción no se puede deshacer.")) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`ads/banners/${id}`);
      dispatch(
        mostrarFeedback({ type: "success", message: "Banner eliminado" })
      );
      onDeleted?.(id);
    } catch {
      dispatch(
        mostrarFeedback({ type: "error", message: "No se pudo eliminar" })
      );
    } finally {
      setLoading(false);
    }
  };

  const image =
    banner.imageUrl ||
    banner.sources?.default ||
    banner.imageDesktopUrl ||
    banner.imageTabletUrl ||
    banner.imageMobileUrl;

  return (
    <div className="bg-white/80 rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm w-full">
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-[#141C24] truncate">
            {banner.title}
          </h3>
          <p className="text-sm text-gray-600 truncate flex items-center gap-2">
            {banner.placement} · <StatusPill status={banner.status} />
            {banner.isFallback ? (
              <span className="text-xs">· Fallback</span>
            ) : null}
            <span className="text-xs">
              {banner.isActive ? "· Activo" : "· Inactivo"}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            ID:{" "}
            <button onClick={copyId} className="underline">
              {id}
            </button>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openUrl(banner.redirectUrl)}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50"
            title="Abrir destino"
          >
            <MdOpenInNew /> Destino
          </button>
          <button
            onClick={copyId}
            className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50"
            title="Copiar ID"
          >
            <MdContentCopy /> Copiar ID
          </button>
        </div>
      </div>

      {/* imagen */}
      <div className="mt-4 rounded-lg overflow-hidden bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={banner.imageAlt || banner.title}
            className="w-full h-auto object-contain"
          />
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      {/* variantes / cloudinary */}
      <div className="grid sm:grid-cols-2 gap-2 mt-2 text-xs">
        {banner.imageUrl && (
          <button
            onClick={() => openUrl(banner.imageUrl)}
            className="text-blue-600 underline text-left"
          >
            Cloudinary (default)
          </button>
        )}
        {banner.imageDesktopUrl && (
          <button
            onClick={() => openUrl(banner.imageDesktopUrl)}
            className="text-blue-600 underline text-left"
          >
            Cloudinary (desktop)
          </button>
        )}
        {banner.imageTabletUrl && (
          <button
            onClick={() => openUrl(banner.imageTabletUrl)}
            className="text-blue-600 underline text-left"
          >
            Cloudinary (tablet)
          </button>
        )}
        {banner.imageMobileUrl && (
          <button
            onClick={() => openUrl(banner.imageMobileUrl)}
            className="text-blue-600 underline text-left"
          >
            Cloudinary (mobile)
          </button>
        )}
      </div>

      {/* meta / métricas */}
      <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
        <div className="space-y-1">
          <div>
            <span className="font-medium">URL destino:</span>{" "}
            <a
              className="text-blue-600 underline break-all"
              href={banner.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {banner.redirectUrl}
            </a>
          </div>
          <div>
            <span className="font-medium">Peso:</span> {banner.weight ?? 1}
          </div>
          <div>
            <span className="font-medium">Impresiones:</span>{" "}
            {banner.impressions ?? 0}{" "}
            {banner.maxImpressions ? `/ ${banner.maxImpressions}` : ""}
          </div>
          <div>
            <span className="font-medium">Clicks:</span> {banner.clicks ?? 0}{" "}
            {banner.maxClicks ? `/ ${banner.maxClicks}` : ""}
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <span className="font-medium">Inicio:</span>{" "}
            {fmtDate(banner.startAt)}
          </div>
          <div>
            <span className="font-medium">Fin:</span> {fmtDate(banner.endAt)}
          </div>
          <div>
            <span className="font-medium">Creado por:</span>{" "}
            {banner.createdByName || banner.createdBy || "—"} (
            {banner.createdByRole || "—"})
          </div>
          <div>
            <span className="font-medium">Precio:</span>{" "}
            {((banner.priceCents ?? 0) / 100).toFixed(2)}{" "}
            {banner.currency?.toUpperCase?.() || "USD"}
          </div>
        </div>
        <div className="space-y-1 md:col-span-2">
          <span className="font-medium">Segmentación:</span>{" "}
          {banner.communities?.length ||
          banner.categories?.length ||
          banner.businesses?.length ? (
            <span className="text-gray-700">
              comm: {banner.communities?.length ?? 0} · cat:{" "}
              {banner.categories?.length ?? 0} · biz:{" "}
              {banner.businesses?.length ?? 0}
            </span>
          ) : (
            "Sin restricción"
          )}
        </div>
      </div>

      {/* acciones */}
      {isAdmin && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {/* flujo de revisión */}
          {["submitted"].includes(banner.status) && (
            <button
              onClick={markUnderReview}
              disabled={loading}
              className="inline-flex items-center gap-1 bg-slate-700 text-white text-sm px-3 py-2 rounded hover:bg-slate-800 transition"
              title="Marcar En revisión"
            >
              <MdPlayCircle className="text-base" /> En revisión
            </button>
          )}
          {["submitted", "under_review"].includes(banner.status) && (
            <button
              onClick={approve}
              disabled={loading}
              className="inline-flex items-center gap-1 bg-emerald-600 text-white text-sm px-3 py-2 rounded hover:bg-emerald-700 transition"
              title="Aprobar"
            >
              <MdCheckCircle className="text-base" /> Aprobar
            </button>
          )}
          {[
            "submitted",
            "under_review",
            "approved",
            "awaiting_payment",
          ].includes(banner.status) && (
            <button
              onClick={reject}
              disabled={loading}
              className="inline-flex items-center gap-1 bg-gray-700 text-white text-sm px-3 py-2 rounded hover:bg-gray-800 transition"
              title="Rechazar"
            >
              <MdCancel className="text-base" /> Rechazar
            </button>
          )}

          {/* estado activo */}
          <button
            onClick={toggleActive}
            disabled={loading}
            className="inline-flex items-center gap-1 bg-white border border-gray-300 text-sm px-3 py-2 rounded hover:bg-gray-50 transition"
            title="Activar/Desactivar"
          >
            {banner.isActive ? "Desactivar" : "Activar"}
          </button>

          {/* checkout */}
          {["approved", "awaiting_payment"].includes(banner.status) && (
            <button
              onClick={checkout}
              disabled={loading}
              className="inline-flex items-center gap-1 bg-black text-white text-sm px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition"
              title="Crear Checkout"
            >
              Checkout
            </button>
          )}

          {/* editar / eliminar */}
          <button
            onClick={del}
            disabled={loading}
            className="inline-flex items-center gap-1 bg-red-600 text-white text-sm px-3 py-2 rounded hover:bg-red-700 transition ml-auto"
            title="Eliminar"
          >
            <MdDelete className="text-base" /> Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
