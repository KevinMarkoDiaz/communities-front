import { useState } from "react";
import Select from "react-select";
import axiosInstance from "../api/axiosInstance";
import { customSelectStylesForm } from "../../src/styles/customSelectStylesForm";

export default function SelectOrganizer({ value, onChange }) {
  const [input, setInput] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarOrganizadores = async () => {
    if (input.length < 2) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/busqueda/search/organizers?q=${input}`
      );
      const opcionesFormateadas = res.data.map((item) => ({
        label: item.label,
        value: item.value,
        model: item.model,
      }));
      setOpciones(opcionesFormateadas);
    } catch (err) {
      console.error("Error buscando organizadores:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block  text-xs font-medium">Organizador</label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe nombre..."
          className="flex-1 border border-white/30 bg-white/10 text-white placeholder:text-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          onClick={buscarOrganizadores}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
        >
          Buscar
        </button>
      </div>

      <Select
        menuPlacement="top"
        isLoading={loading}
        options={opciones}
        value={value}
        onChange={onChange}
        placeholder="Selecciona un organizador..."
        styles={customSelectStylesForm}
        classNamePrefix="rs"
        noOptionsMessage={() => "Sin resultados"}
      />
    </div>
  );
}
