import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCommunities,
  getCommunityBySlug,
  getMyCommunities,
} from "../api/communityApi";
import { mostrarFeedback } from "./feedbackSlice";

// 🔁 Todas las comunidades
export const fetchComunidades = createAsyncThunk(
  "comunidades/fetchAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllCommunities();
      return data.communities;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar las comunidades",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error desconocido");
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().comunidades;
      return !state.loaded;
    },
  }
);

// 🔁 Mis comunidades
export const fetchMisComunidades = createAsyncThunk(
  "comunidades/fetchMine",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getMyCommunities();
      return data.communities;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus comunidades",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error desconocido");
    }
  },
  {
    condition: (_, { getState }) => {
      return getState().comunidades.misComunidades.length === 0;
    },
  }
);

// 🔁 Comunidad por slug
export const fetchCommunityBySlug = createAsyncThunk(
  "comunidades/fetchBySlug",
  async (slug, { rejectWithValue, dispatch }) => {
    try {
      const data = await getCommunityBySlug(slug);
      return data.community;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo cargar la comunidad",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "No se pudo cargar la comunidad");
    }
  }
);

const comunidadesSlice = createSlice({
  name: "comunidades",
  initialState: {
    lista: [],
    misComunidades: [],
    comunidadActual: null,
    loadingLista: false,
    loadingMis: false,
    loadingDetalle: false,
    error: null,
    busqueda: "",
    loaded: false,
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
    limpiarComunidadActual: (state) => {
      state.comunidadActual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔁 fetchComunidades
      .addCase(fetchComunidades.pending, (state) => {
        state.loadingLista = true;
        state.error = null;
      })
      .addCase(fetchComunidades.fulfilled, (state, action) => {
        state.loadingLista = false;
        state.lista = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComunidades.rejected, (state, action) => {
        state.loadingLista = false;
        state.error = action.payload;
      })

      // 🔁 fetchMisComunidades
      .addCase(fetchMisComunidades.pending, (state) => {
        state.loadingMis = true;
        state.error = null;
      })
      .addCase(fetchMisComunidades.fulfilled, (state, action) => {
        state.loadingMis = false;
        state.misComunidades = action.payload;
      })
      .addCase(fetchMisComunidades.rejected, (state, action) => {
        state.loadingMis = false;
        state.error = action.payload;
      })

      // 🔁 fetchCommunityBySlug
      .addCase(fetchCommunityBySlug.pending, (state) => {
        state.loadingDetalle = true;
        state.error = null;
        state.comunidadActual = null;
      })
      .addCase(fetchCommunityBySlug.fulfilled, (state, action) => {
        state.loadingDetalle = false;
        state.comunidadActual = action.payload;
      })
      .addCase(fetchCommunityBySlug.rejected, (state, action) => {
        state.loadingDetalle = false;
        state.error = action.payload;
        state.comunidadActual = null;
      });
  },
});

export const { setBusqueda, limpiarComunidadActual } = comunidadesSlice.actions;
export default comunidadesSlice.reducer;
