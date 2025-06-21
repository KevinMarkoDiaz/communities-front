export default function CardHorizontal({ title, description, image, tipo }) {
  const hasImage = Boolean(image);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 px-2 py-1 min-h-[100px] border border-gray-200 bg-white transition duration-300 hover:shadow-lg rounded-xl">
      {/* Imagen o ícono */}
      <div
        className={`w-full md:w-50 aspect-[16/9] bg-center bg-no-repeat bg-cover rounded-xl flex items-center justify-center ${
          hasImage ? "" : "bg-gray-100"
        }`}
        style={hasImage ? { backgroundImage: `url("${image}")` } : {}}
      >
        {!hasImage && (
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69.01-2.5 3.27-3.88 4.9-3.88
                1.63 0 4.89 1.38 4.9 3.88C15.55 19.37 13.85 20 12 20zm0-8a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        )}
      </div>

      {/* Texto */}
      <div className="flex flex-col justify-center gap-1 w-full">
        <p className="text-[#141C24] text-[16px] font-semibold leading-tight tracking-tight line-clamp-1">
          {title}
        </p>
        <p className="text-[#5A6B87] text-xs font-normal leading-snug line-clamp-2">
          {description}
        </p>
        <p className="text-[#7A8CA3] text-xs font-medium uppercase tracking-wide">
          {tipo}
        </p>
      </div>
    </div>
  );
}
