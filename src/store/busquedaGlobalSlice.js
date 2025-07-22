import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBusquedaGlobal } from "../api/busquedaApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅ Acción global

// Estado inicial separado
const initialState = {
  termino: "",
  resultados: [],
  loading: false,
  error: null,
};

export const buscarGlobalThunk = createAsyncThunk(
  "busquedaGlobal/fetch",
  async (termino, { rejectWithValue, dispatch }) => {
    try {
      const resultados = await fetchBusquedaGlobal(termino);
      return { termino, resultados };
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Ocurrió un error al realizar la búsqueda",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al buscar globalmente");
    }
  }
);

const busquedaGlobalSlice = createSlice({
  name: "busquedaGlobal",
  initialState,
  reducers: {
    limpiarBusquedaGlobal: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => initialState) // ✅ Reset global

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
