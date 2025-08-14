// src/pages/dashboard/banners/components/BannerFilters.jsx
import { MdSearch, MdTune, MdRestartAlt } from "react-icons/md";

const placements = [
  { value: "", label: "Todos los placements" },
  { value: "home_top", label: "Home Top" },
  { value: "home_bottom", label: "Home Bottom" },
  { value: "sidebar_right_1", label: "Sidebar derecha #1" },
  { value: "sidebar_right_2", label: "Sidebar derecha #2" },
  { value: "listing_top", label: "Listado Top" },
  { value: "listing_inline", label: "Listado Inline" },
  { value: "community_banner", label: "Detalle Comunidad" },
  { value: "event_banner", label: "Detalle Evento" },
  { value: "business_banner", label: "Detalle Negocio" },
  { value: "custom", label: "Custom" },
];

const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "submitted", label: "Pendientes" },
  { value: "under_review", label: "En revisión" },
  { value: "approved", label: "Aprobados (pago)" },
  { value: "awaiting_payment", label: "Esperando pago" },
  { value: "active", label: "Publicados" },
  { value: "rejected", label: "Rechazados" },
  { value: "archived", label: "Archivados" },
];

export default function BannerFilters({
  q,
  setQ,
  placement,
  setPlacement,
  status,
  setStatus,
  activeOnly,
  setActiveOnly,
  onReset,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-2">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <MdSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título…"
            className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white/80"
          />
        </div>

        <div className="flex items-center gap-2">
          <MdTune className="text-gray-600" />
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-md text-sm bg-white/80"
          >
            {placements.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-2 py-2 border border-gray-300 rounded-md text-sm bg-white/80"
            title="Estado"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
            />
            Solo activos
          </label>
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50"
      >
        <MdRestartAlt className="text-lg" />
        Reset
      </button>
    </div>
  );
}
