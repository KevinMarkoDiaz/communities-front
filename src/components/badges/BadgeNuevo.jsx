export default function BadgeNuevo() {
  return (
    <span
      className="flex items-center gap-1 px-2 py-[1px] text-[10px] font-semibold uppercase italic tracking-tight text-black shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
      style={{
        background: "linear-gradient(to right, #d8b4fe, #f3e8ff)",
        clipPath:
          "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 10% 50%)",
      }}
    >
      <svg
        className="w-3 h-3 text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M11.3 1.046a.75.75 0 011.255.794L10.805 7h3.445a.75.75 0 01.6 1.2l-6.5 8.5a.75.75 0 01-1.31-.684L8.695 11H5.25a.75.75 0 01-.6-1.2l6.65-8.754z" />
      </svg>
      Nuevo
    </span>
  );
}
