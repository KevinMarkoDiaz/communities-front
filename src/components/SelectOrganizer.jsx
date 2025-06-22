import { useState } from "react";
import Select from "react-select";
import axiosInstance from "../api/axiosInstance";

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
    <div className="space-y-2">
      <label className="block text-sm font-medium">Organizador</label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe nombre..."
          className="flex-1 border px-3 py-2 rounded-lg"
        />
        <button
          type="button"
          onClick={buscarOrganizadores}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Buscar
        </button>
      </div>

      <Select
        isLoading={loading}
        options={opciones}
        value={value}
        onChange={onChange}
        placeholder="Selecciona un organizador"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "3rem",
            borderRadius: "0.75rem",
          }),
        }}
      />
    </div>
  );
}
