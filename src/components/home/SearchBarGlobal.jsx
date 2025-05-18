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
          <span className="px-3 text-[#8a7560]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </span>
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
          className="h-12 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
