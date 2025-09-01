import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBusinessesForMapByCommunity } from "../api/businessApi";
import { mostrarFeedback } from "./feedbackSlice";

// Helper seguro para SSR/parseo

// ✅ Estado inicial cargado desde localStorage (seguro)
const initialState = {
  comunidad: null,
  negocios: [],
  loaded: false,
};

// ✅ Thunk usando coordenadas + comunidad (para mapa)
export const cargarNegociosDeComunidad = createAsyncThunk(
  "comunidadSeleccionada/cargarNegocios",
  async ({ communityId, coords }, { rejectWithValue, dispatch }) => {
    try {
      const negocios = await getBusinessesForMapByCommunity(
        communityId,
        coords
      );
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

const persist = (state) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("comunidadSeleccionada", JSON.stringify(state));
  } catch {
    /* noop */
  }
};

const comunidadSeleccionadaSlice = createSlice({
  name: "comunidadSeleccionada",
  initialState,
  reducers: {
    setComunidadSeleccionada: (state, action) => {
      const comunidad = action.payload || null;
      const next = { comunidad, negocios: [], loaded: false };
      persist(next);
      return next;
    },
    setNegociosDeComunidad: (state, action) => {
      const negocios = action.payload;
      const next = { ...state, negocios, loaded: true };
      persist(next);
      return next;
    },
    limpiarComunidadSeleccionada: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("comunidadSeleccionada");
      }
      return { comunidad: null, negocios: [], loaded: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cargarNegociosDeComunidad.fulfilled, (state, action) => {
        state.negocios = action.payload;
        state.loaded = true;
        persist(state);
      })
      .addCase(cargarNegociosDeComunidad.rejected, (state) => {
        state.loaded = true; // evita retry loop
      });
  },
});

export const {
  setComunidadSeleccionada,
  setNegociosDeComunidad,
  limpiarComunidadSeleccionada,
} = comunidadSeleccionadaSlice.actions;

export default comunidadSeleccionadaSlice.reducer;
