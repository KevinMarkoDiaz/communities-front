import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";

export default function DropzoneImagen({
  value,
  onChange,
  label = "Imagen destacada",
  className = "", // estilo del área de drop
  infoTextClassName = "text-xs text-gray-200", // estilo del texto de formatos
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file instanceof File) {
          onChange(file);
        }
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-100">{label}</label>

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center transition cursor-pointer
          ${
            isDragActive
              ? "bg-blue-50 border-blue-400 text-blue-600"
              : "border-gray-300 text-gray-200 hover:border-blue-400 hover:bg-blue-50"
          }
          ${className}`}
      >
        <input {...getInputProps()} />

        <FaCamera className="w-8 h-8 mb-2 opacity-70" />
        <p className="text-sm font-medium text-xs text-gray-200">
          {isDragActive
            ? "Suelta la imagen aquí..."
            : "Toca o arrastra una imagen desde tu galería"}
        </p>
        <p className={infoTextClassName}>Formatos: JPG, PNG, WEBP</p>
      </div>

      {value && (
        <div className="mt-2">
          <img
            src={typeof value === "string" ? value : URL.createObjectURL(value)}
            alt="Vista previa"
            className="rounded-lg border  w-full max-w-[160px]  shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
