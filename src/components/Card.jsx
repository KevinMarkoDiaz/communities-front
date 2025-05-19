export default function CardDestacado({ title, image, description }) {
  const hasImage = Boolean(image);

  return (
    <div className="w-full max-w-[400px] min-w-[160px] aspect-[6/3] border border-gray-300 rounded-xl transition hover:border-black hover:scale-[1.02] hover:shadow-sm transform overflow-hidden flex flex-col">
      <div
        className={`w-full h-[60%] bg-center bg-cover bg-no-repeat ${
          hasImage ? "" : "bg-gray-100 flex items-center justify-center"
        }`}
        style={hasImage ? { backgroundImage: `url("${image}")` } : {}}
      >
        {!hasImage && (
          <svg
            className="w-6 h-6 text-gray-400"
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

      <div className="flex flex-col justify-between h-[40%] px-2 py-1">
        <p className="text-[#181411] text-sm font-semibold leading-snug line-clamp-1">
          {title}
        </p>
        <p className="text-[#3F5374] text-xs font-normal leading-snug line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
