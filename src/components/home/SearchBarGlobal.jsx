import { FiSearch } from "react-icons/fi";

export default function SearchBarGlobal({
  value,
  onChange,
  onBuscar,
  onLimpiar,
  placeholder = "Buscar...",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onBuscar();
    }
  };

  return (
    <div className="px-4 py-3">
      <div
        className="
          flex items-center gap-2
          bg-black/60 backdrop-blur-md
          rounded-xl
          overflow-hidden
          h-12
          px-3
          transition
          focus-within:ring-2 focus-within:ring-white/30
        "
      >
        <FiSearch className="text-white " size={18} />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value.trim() === "") {
              onLimpiar?.();
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            flex-1
            bg-transparent
            border-none
            outline-none
            text-sm
            text-white placeholder:text-white/80
          "
        />
      </div>
    </div>
  );
}
