// src/pages/dashboard/banners/components/StatusPill.jsx
export default function StatusPill({ status }) {
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
