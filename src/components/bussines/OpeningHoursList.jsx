export function OpeningHoursList({ hours }) {
  if (!Array.isArray(hours) || hours.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="text-lg font-bold mb-2">Horarios de atención</h3>
      <ul className="text-sm text-[#181411] space-y-1">
        {hours.map(({ dia, apertura, cierre }, idx) => (
          <li key={idx} className="flex justify-between">
            <span className="capitalize">{dia}</span>
            <span>
              {apertura} - {cierre}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
