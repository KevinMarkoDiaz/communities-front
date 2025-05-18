import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEventos } from "../utils/api";

export const obtenerEventos = createAsyncThunk(
  "eventos/fetch",
  async () => {
    const data = await fetchEventos();
    return data;
  }
);

const eventosSlice = createSlice({
  name: "eventos",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "" // 🔹 agregamos este campo
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(obtenerEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// 🔹 Exportamos la acción acá
export const { setBusqueda } = eventosSlice.actions;

export default eventosSlice.reducer;
