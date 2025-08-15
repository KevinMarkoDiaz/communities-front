import { useState } from "react";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  entityName,
}) {
  const [inputValue, setInputValue] = useState("");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-md w-full rounded-xl shadow-xl p-6 flex flex-col gap-5"
      >
        {/* Título */}
        <h2 className=" text-lg font-bold text-[#141C24] leading-snug">
          ¿Quieres eliminar <span className="text-red-600">{entityName}</span>?
        </h2>

        {/* Descripción */}
        <p className="  text-xs text-gray-600">
          Para confirmar, escribe el nombre exactamente como aparece.
        </p>

        {/* Nombre de referencia */}
        <div className="  text-xs font-medium text-gray-800 border border-gray-200 bg-gray-50 rounded px-3 py-1 w-fit">
          {entityName}
        </div>

        {/* Campo de entrada */}
        <input
          type="text"
          placeholder="Escribe aquí el nombre completo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2  text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {inputValue.trim() && inputValue.trim() !== entityName && (
          <p className="text-xs text-red-500 mt-1">
            El nombre no coincide exactamente.
          </p>
        )}

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition  text-xs"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              setInputValue("");
            }}
            disabled={inputValue.trim() !== entityName}
            className={`w-full sm:w-auto px-4 py-2 rounded  text-xs font-semibold transition ${
              inputValue.trim() === entityName
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
