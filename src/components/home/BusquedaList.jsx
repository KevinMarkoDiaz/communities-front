import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  buscarGlobalThunk,
  limpiarBusquedaGlobal,
} from "../../store/busquedaGlobalSlice";
import HeroBanner from "../HeroBanner";
import SearchBarGlobal from "./SearchBarGlobal";

export default function BusquedaList({ onResultadosRef, onResaltar }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleBuscar = () => {
    const texto = input.trim();
    if (texto) {
      dispatch(buscarGlobalThunk(texto)).then(() => {
        onResultadosRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        onResaltar?.();
      });
    } else {
      dispatch(limpiarBusquedaGlobal());
    }
  };

  const handleLimpiar = () => {
    setInput("");
    dispatch(limpiarBusquedaGlobal());
  };

  return (
    <HeroBanner
      onBuscar={() => (
        <SearchBarGlobal
          value={input}
          onChange={setInput}
          onBuscar={handleBuscar}
          onLimpiar={handleLimpiar}
        />
      )}
    />
  );
}
