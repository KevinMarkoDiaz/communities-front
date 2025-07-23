import { useSelector, useDispatch } from "react-redux";
import { setComunidadSeleccionada } from "../store/comunidadSeleccionadaSlice";
import { useState, useMemo, useRef, useEffect } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import Select from "react-select";
import { customSelectStylesRefinado } from "../styles/customSelectStylesRefinado";
import ilust1 from "../assets/ilust1.svg";

export default function SidebarComunidadMobile() {
  const dispatch = useDispatch();
  const comunidades = useSelector((state) => state.comunidades.lista || []);
  const comunidadSeleccionada = useSelector(
    (state) => state.comunidadSeleccionada.comunidad
  );

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const dropdownRef = useRef(null); // 🧠 Referencia para detectar clics fuera

  const opciones = useMemo(
    () =>
      comunidades.map((com) => ({
        label: com.name,
        value: com._id,
      })),
    [comunidades]
  );

  const selectedOption = useMemo(() => {
    if (!comunidadSeleccionada) return null;
    return (
      opciones.find((opt) => opt.value === comunidadSeleccionada._id) || null
    );
  }, [comunidadSeleccionada, opciones]);

  const handleSelectChange = (opcion) => {
    const comunidad = comunidades.find((c) => c._id === opcion?.value);
    dispatch(setComunidadSeleccionada(comunidad || null));
    setMostrarDropdown(false);
  };

  const noComunidadSeleccionada = !comunidadSeleccionada;

  // 👇 Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMostrarDropdown(false);
      }
    };

    if (mostrarDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarDropdown]);

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col justify-between w-[230px] mt-20 p-6 shadow-lg h-[60vh] overflow-hidden relative bg-gradient-to-b from-[#fff7ec] to-[#f3e8ff]">
        <div className="space-y-4">
          <div>
            <img
              src={ilust1}
              alt="Comunidades conectadas"
              className="w-[60%] mx-auto mt-6 opacity-90"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              ¿De qué comunidad sos?
            </h2>
            <p className="text-xs text-gray-500 mt-1 leading-tight">
              Elegí una para ver contenido relevante.
            </p>
          </div>

          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={opciones}
            placeholder="Elegí con cuál te sentís parte"
            isClearable
            isSearchable={false}
            styles={customSelectStylesRefinado}
            classNamePrefix="rs"
            noOptionsMessage={() => "Sin resultados"}
          />
        </div>
      </aside>

      {/* Botón flotante Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setMostrarDropdown((prev) => !prev)}
          className={`fixed z-50 border shadow-lg text-sky-600 flex items-center justify-center rounded-full transition-all duration-300
          ${
            noComunidadSeleccionada
              ? "bottom-6 right-6 p-4 bg-sky-200 animate-pulse"
              : "bottom-6 left-4 p-2 bg-gray-100 scale-75"
          }
        `}
          title="Selecciona tu comunidad"
        >
          <FaGlobeAmericas className="w-6 h-6" />
        </button>

        {/* Dropdown flotante */}
        {mostrarDropdown && (
          <div
            ref={dropdownRef}
            className="fixed bottom-20 right-4 z-50 w-[90vw] max-w-[360px] bg-white p-4 rounded-2xl shadow-xl border h-[40vh] flex flex-col justify-between"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Comunidad
              </label>

              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={opciones}
                placeholder="¿De qué comunidad sos?"
                isClearable
                isSearchable={false}
                styles={customSelectStylesRefinado}
                classNamePrefix="rs"
                noOptionsMessage={() => "Sin resultados"}
              />
            </div>
            <img
              src={ilust1}
              alt="Comunidades conectadas"
              className="w-[50%] mx-auto mt-6 opacity-90"
            />
            <button
              onClick={() => setMostrarDropdown(false)}
              className="text-xs text-gray-500 underline self-end mt-4"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
