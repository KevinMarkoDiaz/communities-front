import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBusinessesByCommunity } from "../api/businessApi";
import { mostrarFeedback } from "./feedbackSlice";

// ✅ Estado inicial cargado desde localStorage
const stored = JSON.parse(localStorage.getItem("comunidadSeleccionada"));
const initialState = stored || {
  comunidad: null,
  negocios: [],
  loaded: false, // ✅ nueva bandera
};

// ✅ Thunk: cargar negocios de una comunidad
export const cargarNegociosDeComunidad = createAsyncThunk(
  "comunidadSeleccionada/cargarNegocios",
  async (communityId, { rejectWithValue, dispatch }) => {
    try {
      const negocios = await getAllBusinessesByCommunity(communityId);
      return Array.isArray(negocios) ? negocios : negocios.businesses || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar los negocios de la comunidad",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar negocios");
    }
  }
);

const comunidadSeleccionadaSlice = createSlice({
  name: "comunidadSeleccionada",
  initialState,
  reducers: {
    setComunidadSeleccionada: (state, action) => {
      const comunidad = action.payload;
      const payload = { comunidad, negocios: [], loaded: false };
      localStorage.setItem("comunidadSeleccionada", JSON.stringify(payload));
      return payload;
    },
    setNegociosDeComunidad: (state, action) => {
      const negocios = action.payload;
      const nueva = { ...state, negocios, loaded: true };
      localStorage.setItem("comunidadSeleccionada", JSON.stringify(nueva));
      return nueva;
    },
    limpiarComunidadSeleccionada: () => {
      localStorage.removeItem("comunidadSeleccionada");
      return {
        comunidad: null,
        negocios: [],
        loaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cargarNegociosDeComunidad.fulfilled, (state, action) => {
        state.negocios = action.payload;
        state.loaded = true;
        const nueva = { ...state };
        localStorage.setItem("comunidadSeleccionada", JSON.stringify(nueva));
      })
      .addCase(cargarNegociosDeComunidad.rejected, (state) => {
        state.loaded = true; // ✅ Evita retry loop en caso de error
      });
  },
});

export const {
  setComunidadSeleccionada,
  setNegociosDeComunidad,
  limpiarComunidadSeleccionada,
} = comunidadSeleccionadaSlice.actions;

export default comunidadSeleccionadaSlice.reducer;
