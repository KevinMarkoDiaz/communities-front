// src/components/ConfirmDeleteModal.jsx
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  entityName,
  title = "Confirmar eliminación",
  description = "Para confirmar, escribe el nombre exacto:",
}) {
  const [input, setInput] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition"
        >
          <MdClose className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <p className="text-sm font-semibold mt-1 text-gray-800 italic">
          "{entityName}"
        </p>

        <input
          type="text"
          className="mt-4 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Escribe el nombre exacto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (
                input.trim().toLowerCase() === entityName.trim().toLowerCase()
              ) {
                onConfirm();
              } else {
                alert("El nombre no coincide. Revisa e inténtalo de nuevo.");
              }
            }}
            className="text-sm px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
