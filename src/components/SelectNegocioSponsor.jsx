// src/components/SelectNegocioSponsor.jsx
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { obtenerNegocios } from "../store/negociosSlice";

export default function SelectNegocioSponsor({ value, onChange }) {
  const dispatch = useDispatch();
  const negocios = useSelector((state) => state.negocios.lista);
  const loading = useSelector((state) => state.negocios.loading);

  useEffect(() => {
    if (!negocios.length) dispatch(obtenerNegocios());
  }, [dispatch, negocios.length]);

  const cargarOpciones = (inputValue, callback) => {
    const filtrados = negocios
      .filter((n) => n.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map((n) => ({ value: n._id, label: n.name }));

    callback(filtrados);
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        Buscar negocios sponsors (opcional)
      </label>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions={negocios.map((n) => ({
          value: n._id,
          label: n.name,
        }))}
        loadOptions={cargarOpciones}
        value={value}
        onChange={onChange}
        isLoading={loading}
        placeholder="Escribe para buscar..."
        className="text-sm"
      />
    </div>
  );
}
