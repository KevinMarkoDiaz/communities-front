export default function EventInfo({ date, time, location }) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-[#637588]  text-xs">Fecha y hora</p>
        <p className="text-[#111418] text-base font-semibold">
          {new Date(date).toLocaleDateString()} - {time}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[#637588]  text-xs">Ubicación</p>
        <p className="text-[#111418] text-base font-normal">{location}</p>
      </div>
    </div>
  );
}
