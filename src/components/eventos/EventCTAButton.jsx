export default function EventCTAButton({
  onClick,
  label = "Confirmar asistencia",
}) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="bg-[#1773cf] text-white px-5 py-3 rounded-xl font-bold text-base hover:bg-[#125aad] transition"
      >
        {label}
      </button>
    </div>
  );
}
