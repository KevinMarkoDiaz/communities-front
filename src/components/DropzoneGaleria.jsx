import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash, FaImages } from "react-icons/fa";

export default function DropzoneGaleria({
  values = [],
  onChange,
  label = "Galería de imágenes",
  maxImages = 5,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      if (values.length >= maxImages) {
        alert(`Máximo ${maxImages} imágenes`);
        return;
      }

      // 🟢 Solo devuelve archivos (tipo File)
      const nuevosArchivos = acceptedFiles.slice(0, maxImages - values.length);
      onChange([...values, ...nuevosArchivos]);
    },
    [values, onChange, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const eliminarImagen = (index) => {
    const nuevas = values.filter((_, i) => i !== index);
    onChange(nuevas);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-100">{label}</label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl px-4 py-6 text-center transition cursor-pointer ${
          isDragActive
            ? "bg-blue-50 border-blue-400 text-blue-600"
            : "border-gray-300 text-gray-500 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        <input {...getInputProps()} />
        <FaImages className="w-8 h-8 mx-auto mb-2 opacity-70" />
        <p className="text-sm font-medium">
          {isDragActive
            ? "Suelta las imágenes aquí..."
            : "Arrastra o toca para subir múltiples imágenes"}
        </p>
        <p className="text-xs text-gray-400">{`Máximo ${maxImages} imágenes`}</p>
      </div>

      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((img, idx) => (
            <div key={idx} className="relative group">
              {typeof img === "string" ? (
                <img
                  src={img}
                  alt={`Imagen ${idx + 1}`}
                  className="rounded-md border w-full aspect-square object-cover"
                />
              ) : (
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Imagen ${idx + 1}`}
                  className="rounded-md border w-full aspect-square object-cover"
                />
              )}

              <button
                type="button"
                onClick={() => eliminarImagen(idx)}
                className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 rounded-full p-1 shadow"
                title="Eliminar"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
