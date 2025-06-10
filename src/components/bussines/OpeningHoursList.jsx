export function OpeningHoursList({ hours }) {
  if (!Array.isArray(hours) || hours.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Horarios de atención
      </h2>
      <div className="p-4 grid grid-cols-2">
        {hours.map(({ day, open, close, closed }, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-1 border-t border-solid border-t-[#e6e0db] py-4 ${
              idx % 2 === 0 ? "pr-2" : "pl-2"
            } ${
              idx === hours.length - 1 && hours.length % 2 !== 0
                ? "col-span-2 pr-[50%]"
                : ""
            }`}
          >
            <p className="text-[#8a7460] text-sm font-normal leading-normal capitalize">
              {day}
            </p>
            <p className="text-[#181411] text-sm font-normal leading-normal">
              {closed ? "Cerrado" : `${open} - ${close}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
