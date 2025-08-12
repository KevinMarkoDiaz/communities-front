import { useSelector, useDispatch } from "react-redux";
import { setComunidadSeleccionada } from "../store/comunidadSeleccionadaSlice";
import { useState, useMemo, useRef, useEffect } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import Select from "react-select";
import { customSelectStylesRefinado } from "../styles/customSelectStylesRefinado";
import ilust1 from "../assets/ilust1.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarComunidadMobile() {
  const dispatch = useDispatch();
  const comunidades = useSelector((state) => state.comunidades.lista || []);
  const comunidadSeleccionada = useSelector(
    (state) => state.comunidadSeleccionada.comunidad
  );

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  // Detectar clic fuera del dropdown
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
      <aside className="hidden 2xl:flex flex-col justify-between  2xl:w-[12vw] mt-20 p-2  shadow-lg h-[60vh] overflow-hidden relative bg-gradient-to-b from-[#fff7ec] to-[#f3e8ff]">
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
            isSearchable={false}
            styles={customSelectStylesRefinado}
            classNamePrefix="rs"
            noOptionsMessage={() => "Sin resultados"}
          />
        </div>
      </aside>

      {/* Botón flotante Mobile con animación */}
      <div className="2xl:hidden">
        <AnimatePresence>
          {!mostrarDropdown && (
            <motion.button
              key="boton-flotante"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMostrarDropdown(true)}
              className={`fixed z-50 border shadow-xl text-sky-600 flex items-center justify-center rounded-full transition-all duration-300 ${
                noComunidadSeleccionada
                  ? "bottom-6 right-6 p-4 bg-sky-200 animate-pulse scale-110"
                  : "bottom-6 left-4 p-2 bg-gray-100 scale-75"
              }`}
              title="Selecciona tu comunidad"
            >
              <FaGlobeAmericas className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Dropdown flotante con animación */}
        <AnimatePresence>
          {mostrarDropdown && (
            <motion.div
              key="dropdown-flotante"
              ref={dropdownRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.35 }}
              className="fixed bottom-5 2xl:bottom-20 right-4 z-50 w-[90vw] max-w-[360px] bg-gradient-to-b from-[#fff7ec] to-[#f3e8ff] p-4 rounded-2xl shadow-2xl border border-sky-300 h-[40vh] min-h-[350px] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Comunidad
                </label>

                <Select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  options={opciones}
                  placeholder="¿De qué comunidad eres?"
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
                className="text-xs text-gray-500 self-end mt-4"
              >
                Cerrar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
