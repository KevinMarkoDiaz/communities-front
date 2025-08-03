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
    <div className="px-4 py-3 flex">
      <div
        className="
        
          flex items-center gap-2
          bg-white/50 backdrop-blur-md
          border border-sky-400
          rounded-2xl
          h-12 px-4
          shadow-2xl
          transition-all
          focus-within:border-sky-400
          focus-within:ring-2
          focus-within:ring-sky-300/40
          w-full max-w-[400px]
        "
      >
        <FiSearch className="text-black " />
        <input
          type="text"
          inputMode="search"
          autoComplete="off"
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
            text-base
            text-black
            placeholder:text-black
          "
        />
      </div>
    </div>
  );
}
