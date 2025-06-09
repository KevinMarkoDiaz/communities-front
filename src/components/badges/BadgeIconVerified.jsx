export default function BadgeIconVerified() {
  return (
    <div
      className="w-4 h-4 p-[2px] ring-2 ring-sky-400 shadow-inner bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center"
      style={{
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      }}
      title="Verificado por Communities"
    >
      <svg
        className="w-2.5 h-2.5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12.5c1.5 2 4 4.5 4 4.5s6-8.5 14-12" />
      </svg>
    </div>
  );
}
