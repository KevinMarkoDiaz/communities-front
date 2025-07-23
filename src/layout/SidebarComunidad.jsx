import { useSelector, useDispatch } from "react-redux";
import { setComunidadSeleccionada } from "../store/comunidadSeleccionadaSlice";
import { useState } from "react";
import { FaGlobeAmericas } from "react-icons/fa";

export default function SidebarComunidad() {
  const dispatch = useDispatch();
  const comunidades = useSelector((state) => state.comunidades.lista || []);
  const comunidadSeleccionada = useSelector(
    (state) => state.comunidadSeleccionada
  );

  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const handleChange = (e) => {
    const comunidadId = e.target.value;
    const comunidad = comunidades.find((c) => c._id === comunidadId);
    dispatch(setComunidadSeleccionada(comunidad));
    setMostrarDropdown(false); // cerrar al seleccionar
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] p-4 space-y-6 border-r bg-white shadow-inner">
        <h2 className="text-lg font-semibold text-gray-700">
          Selecciona comunidad
        </h2>

        <select
          value={comunidadSeleccionada?._id || ""}
          onChange={handleChange}
          className="p-2 rounded-md border bg-white shadow text-sm"
        >
          <option value="">Todas las comunidades</option>
          {comunidades.map((com) => (
            <option key={com._id} value={com._id}>
              {com.name}
            </option>
          ))}
        </select>
      </aside>

      {/* Mobile botón flotante */}
      <div className="lg:hidden">
        {/* Botón flotante */}
        <button
          onClick={() => setMostrarDropdown((prev) => !prev)}
          className="fixed bottom-6 right-6 z-50 bg-white border shadow-lg rounded-full p-4 flex items-center justify-center text-sky-600 hover:bg-sky-50"
        >
          <FaGlobeAmericas className="w-6 h-6" />
        </button>

        {/* Dropdown flotante */}
        {mostrarDropdown && (
          <div className="fixed bottom-20 right-6 z-50 bg-white p-3 rounded-xl shadow-xl border w-[260px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selecciona comunidad
            </label>
            <select
              value={comunidadSeleccionada?._id || ""}
              onChange={handleChange}
              className="w-full p-2 rounded-md border bg-white shadow text-sm"
            >
              <option value="">Todas las comunidades</option>
              {comunidades.map((com) => (
                <option key={com._id} value={com._id}>
                  {com.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
}
