import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEvents } from "../api/eventApi";

export const obtenerEventos = createAsyncThunk("eventos/fetch", async () => {
  const data = await getAllEvents();
  // 🔒 Adaptar si viene como { events: [...] }
  return Array.isArray(data) ? data : data.events || [];
});

const eventosSlice = createSlice({
  name: "eventos",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "",
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(obtenerEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar eventos";
      });
  },
});

export const { setBusqueda } = eventosSlice.actions;
export default eventosSlice.reducer;
