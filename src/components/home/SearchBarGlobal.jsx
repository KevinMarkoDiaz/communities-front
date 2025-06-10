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
      <div className="flex items-center gap-2">
        <div className="flex items-center flex-1 bg-[#f5f2f0] rounded-xl overflow-hidden h-12">
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
            className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-[#181411]"
          />
        </div>

        <button
          onClick={onBuscar}
          className="  rounded-lg hover:bg-blue-700 transition"
        >
          <FiSearch size={25} className="text-white" />
        </button>
      </div>
    </div>
  );
}
