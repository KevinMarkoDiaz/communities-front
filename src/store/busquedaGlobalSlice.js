import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBusquedaGlobal } from "../api/busquedaApi";

export const buscarGlobalThunk = createAsyncThunk(
  "busquedaGlobal/fetch",
  async (termino, { rejectWithValue }) => {
    try {
      const resultados = await fetchBusquedaGlobal(termino);
      return { termino, resultados };
    } catch (error) {
      return rejectWithValue(error.message || "Error al buscar globalmente");
    }
  }
);

const busquedaGlobalSlice = createSlice({
  name: "busquedaGlobal",
  initialState: {
    termino: "",
    resultados: [],
    loading: false,
    error: null,
  },
  reducers: {
    limpiarBusquedaGlobal: (state) => {
      state.termino = "";
      state.resultados = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarGlobalThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buscarGlobalThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.termino = action.payload.termino;
        state.resultados = action.payload.resultados;
      })
      .addCase(buscarGlobalThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { limpiarBusquedaGlobal } = busquedaGlobalSlice.actions;

export default busquedaGlobalSlice.reducer;
