export default function CardHorizontal({ title, description, image }) {
  const hasImage = Boolean(image);

  return (
    <div className="flex items-center gap-4  px-4 min-h-[72px] py-2 rounded-lg  transition duration-300">
      <div
        className={`aspect-square bg-center bg-no-repeat bg-cover rounded-lg size-14 flex items-center justify-center ${
          hasImage ? "" : "bg-gray-200"
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

      <div className="flex flex-col justify-center">
        <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
          {title}
        </p>
        <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
