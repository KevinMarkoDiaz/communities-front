import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Buscar...",
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (value.trim() === "") {
        onSearch(null); // Limpia si está vacío
      } else {
        onSearch(value);
      }
    }
  };

  const handleClick = () => {
    if (value.trim() === "") {
      onSearch(null); // Limpia si está vacío
    } else {
      onSearch(value);
    }
  };

  return (
    <div className="py-3 w-full flex justify-center">
      <div className="flex w-full max-w-xl h-12 gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f5f2f0] h-full placeholder:text-[#8a7560] px-4 border-l-0 text-base font-normal leading-normal"
        />

        <button
          onClick={handleClick}
          className="  rounded-lg hover:bg-blue-700 transition"
        >
          <FiSearch size={20} className="text-black" />
        </button>
      </div>
    </div>
  );
}
