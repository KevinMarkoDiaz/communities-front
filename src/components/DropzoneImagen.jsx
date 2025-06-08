import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";

export default function DropzoneImagen({
  value,
  onChange,
  label = "Imagen destacada",
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file); // ⬅️ Guarda archivo tipo File
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
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center transition cursor-pointer
          ${
            isDragActive
              ? "bg-blue-50 border-blue-400 text-blue-600"
              : "border-gray-300 text-gray-500 hover:border-blue-400 hover:bg-blue-50"
          }`}
      >
        <input {...getInputProps()} />

        <FaCamera className="w-8 h-8 mb-2 opacity-70" />
        <p className="text-sm font-medium">
          {isDragActive
            ? "Suelta la imagen aquí..."
            : "Toca o arrastra una imagen desde tu galería"}
        </p>
        <p className="text-xs text-gray-400">Formatos: JPG, PNG, WEBP</p>
      </div>

      {value && (
        <div className="mt-2">
          {typeof value === "string" ? (
            <img
              src={value}
              alt="Vista previa"
              className="rounded-lg border w-full max-w-xs shadow"
            />
          ) : (
            <img
              src={URL.createObjectURL(value)}
              alt="Vista previa"
              className="rounded-lg border w-full max-w-xs shadow"
            />
          )}
        </div>
      )}
    </div>
  );
}
