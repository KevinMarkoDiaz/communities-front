import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBusinesses } from "../api/businessApi";

// AsyncThunk para obtener todos los negocios
export const obtenerNegocios = createAsyncThunk("negocios/fetch", async () => {
  const data = await getAllBusinesses();
  return Array.isArray(data) ? data : data.businesses || [];
});

const negociosSlice = createSlice({
  name: "negocios",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "",
    categoria: "todas", // o "" según tu lógica de filtros
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
    setCategoria: (state, action) => {
      state.categoria = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerNegocios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerNegocios.fulfilled, (state, action) => {
        console.log("🧪 Payload recibido:", action.payload);
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(obtenerNegocios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar negocios";
      });
  },
});

export const { setBusqueda, setCategoria } = negociosSlice.actions;
export default negociosSlice.reducer;
