export default function CommunityHero({ name, flagImage, description } = {}) {
  return (
    <div
      className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-4 pb-10 sm:px-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${
          flagImage || "/assets/placeholder.jpg"
        })`,
      }}
    >
      <div className="flex flex-col gap-2 text-left text-white">
        <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">
          {name || "Comunidad"}
        </h1>
        {description && (
          <p className="text-xs sm:text-base font-normal leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
