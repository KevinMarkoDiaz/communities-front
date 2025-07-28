// src/components/promo/ModalGuardarPromo.jsx
import { useDispatch } from "react-redux";
import { claimPromoThunk } from "../../store/userPromosSlice";
import { useState } from "react";

export default function ModalGuardarPromo({ promo, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [guardada, setGuardada] = useState(false);

  const handleGuardar = async () => {
    setLoading(true);
    const res = await dispatch(claimPromoThunk(promo._id));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      setGuardada(true);
      setTimeout(() => {
        onClose(); // cerrar modal tras unos segundos
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-sky-800">{promo.name}</h2>
          <p className="text-gray-700 text-sm">{promo.description}</p>

          {!guardada ? (
            <button
              onClick={handleGuardar}
              disabled={loading}
              className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar promoción"}
            </button>
          ) : (
            <p className="text-green-600 font-semibold">
              ¡Promoción guardada con éxito!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
