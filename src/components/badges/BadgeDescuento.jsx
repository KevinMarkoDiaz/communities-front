export default function BadgeDescuento({ value }) {
  return (
    <span
      className="flex items-center gap-1 px-2 py-[1px] text-[10px] font-semibold uppercase italic tracking-tight"
      style={{
        background: "linear-gradient(to right, #fbbf24, #fde68a)",
        clipPath:
          "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 10% 50%)",
      }}
    >
      <span className="text-white font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">
        {value}
      </span>
      <span className="text-neutral-800 font-semibold">OFF</span>
    </span>
  );
}
