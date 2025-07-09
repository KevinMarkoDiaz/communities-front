export default function AdBanner({ image, link, className = "" }) {
  const hasContent = image && link;

  const baseClasses =
    "ads-banner block h-[120px] border border-gray-200 rounded shadow transition flex items-center justify-center p-2";

  if (hasContent) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} bg-gradient-to-r from-orange-50 to-orange-100 hover:shadow-md ${className}`}
      >
        <img
          src={image}
          alt="Publicidad"
          className="max-h-full max-w-full object-contain"
        />
      </a>
    );
  }

  return (
    <div
      className={`${baseClasses} bg-gradient-to-r from-orange-50 to-orange-100 ${className}`}
    >
      <span className="text-xs text-gray-500 text-center">
        Espacio publicitario disponible
      </span>
    </div>
  );
}
