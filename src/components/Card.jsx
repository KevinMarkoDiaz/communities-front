import BadgeDescuento from "./badges/BadgeDescuento";
import BadgeIconVerified from "./badges/BadgeIconVerified";
import BadgeNuevo from "./badges/BadgeNuevo";
import AvatarPlaceholder from "./placeholder/AvatarPlaceholder";
import ImagePlaceholderIcon from "./placeholder/ImagePlaceholderIcon";

export default function CardDestacado({
  title,
  image,
  logo,
  description,
  isVerified = false,
  isNew = false,
  hasDiscount = false,
  descuento = "20%",
  modo = "horizontal-compact",
}) {
  const hasImage = Boolean(image);

  const classMap = {
    vertical:
      "flex flex-col h-auto w-[100%] md:w-full     max-w-[280px] sm:max-w-[250px] md:max-w-[250px] lg:max-w-[320px]",
    "horizontal-full": "flex h-36 w-full max-w-6xl mx-auto",
    "horizontal-compact":
      "flex h-36 w-[85%] md:w-full max-w-[350px] flex-shrink-0",
  };

  return (
    <div
      className={`border border-gray-300 rounded-2xl overflow-hidden shadow-md mb-6 transition hover:border-black hover:shadow-lg ${classMap[modo]}`}
    >
      <div
        className={
          modo === "vertical"
            ? "w-full  h-42 md:h-22 bg-gray-100"
            : "w-1/3 h-full bg-gray-100 flex items-center justify-center"
        }
      >
        {hasImage ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url("${image}")` }}
          />
        ) : (
          <ImagePlaceholderIcon />
        )}
      </div>

      <div
        className={`${
          modo === "vertical"
            ? "px-4 py-2"
            : "w-2/3 p-4 flex flex-col justify-between"
        }`}
      >
        <div className="flex gap-2 mb-1">
          {hasDiscount && <BadgeDescuento value={descuento} />}
          {isNew && <BadgeNuevo />}
        </div>

        {modo === "vertical" ? (
          <div className="flex items-start gap-3">
            {logo ? (
              <div
                className="w-10 h-10 rounded-2xl bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url("${logo}")` }}
              />
            ) : (
              <AvatarPlaceholder />
            )}

            <div className="flex flex-col gap-1 truncate">
              <div className="flex items-center gap-1">
                <p
                  className="text-black text-sm font-bold overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] "
                  title={title}
                >
                  {title}
                </p>
                {isVerified && <BadgeIconVerified />}
              </div>
              {description && (
                <p className="text-[#3F5374] text-xs font-normal truncate">
                  {description}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 truncate">
            <div className="flex items-center gap-1">
              <p
                className="text-black text-sm font-bold overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] "
                title={title}
              >
                {title}
              </p>
              {isVerified && <BadgeIconVerified />}
            </div>
            {description && (
              <p className="text-[#3F5374] text-xs font-normal truncate">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
