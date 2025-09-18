import { useState } from "react";

export function PhotoGallery({ galleryImages = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!Array.isArray(galleryImages) || galleryImages.length === 0) return null;

  const visibleImages = galleryImages.slice(0, 8);

  return (
    <div className="w-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {visibleImages.map((url, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(url)}
            className="group relative w-full overflow-hidden max-w-[350px] border border-1 border-gray-100"
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-[4/6] bg-cover  shadow-sm group-hover:scale-[1.02] transition"
              style={{ backgroundImage: `url("${url}")` }}
            ></div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-full lg:max-w-[50%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute border top-2 right-2 transition rounded-md text-white text-md px-1 hover:text-orange-400"
            >
              cerrar
            </button>
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto max-h-[80vh] lg:max-h-[60vh] object-contain "
            />
          </div>
        </div>
      )}
    </div>
  );
}
