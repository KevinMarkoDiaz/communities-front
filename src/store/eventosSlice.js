// src/store/eventosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEvents, getMyEvents, deleteEvent } from "../api/eventApi";

// 🔁 Todos los eventos
export const obtenerEventos = createAsyncThunk(
  "eventos/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEvents();
      return Array.isArray(data) ? data : data.events || [];
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar eventos");
    }
  }
);

// 🔁 Solo mis eventos
export const fetchMisEventos = createAsyncThunk(
  "eventos/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyEvents();
      return Array.isArray(data) ? data : data.events || [];
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar tus eventos");
    }
  }
);

// 🗑️ Eliminar evento
export const deleteEvento = createAsyncThunk(
  "eventos/deleteEvento",
  async (id, { rejectWithValue }) => {
    try {
      await deleteEvent(id); // asegúrate que esta función exista en api/eventApi
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar evento");
    }
  }
);

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
      // Todos los eventos
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
        state.error = action.payload;
      })

      // Solo mis eventos
      .addCase(fetchMisEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMisEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMisEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Eliminar evento
      .addCase(deleteEvento.fulfilled, (state, action) => {
        state.lista = state.lista.filter((e) => e._id !== action.payload);
      });
  },
});

export const { setBusqueda } = eventosSlice.actions;
export default eventosSlice.reducer;
