export function PhotoGallery({ galleryImages = [] }) {
  if (!Array.isArray(galleryImages) || galleryImages.length === 0) return null;

  // Limitar a 8 imágenes máximo
  const visibleImages = galleryImages.slice(0, 8);

  return (
    <div className="w-full">
      <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Fotos
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-4">
        {visibleImages.map((url, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div
              className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-xl shadow-sm"
              style={{ backgroundImage: `url("${url}")` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
