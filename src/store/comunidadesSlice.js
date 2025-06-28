import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCommunities,
  getCommunityBySlug,
  getMyCommunities,
} from "../api/communityApi";

// 🔁 Thunk para obtener todas las comunidades
export const fetchComunidades = createAsyncThunk(
  "comunidades/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCommunities();
      return data.communities;
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido");
    }
  }
);

// 🔁 Thunk para obtener las comunidades del usuario autenticado
export const fetchMisComunidades = createAsyncThunk(
  "comunidades/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyCommunities();
      return data.communities;
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido");
    }
  }
);

// 🔁 Thunk para obtener una comunidad por slug
export const fetchCommunityBySlug = createAsyncThunk(
  "comunidades/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const data = await getCommunityBySlug(slug);
      return data.community;
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo cargar la comunidad");
    }
  }
);

const comunidadesSlice = createSlice({
  name: "comunidades",
  initialState: {
    lista: [],
    comunidadActual: null,
    loading: false,
    error: null,
    busqueda: "",
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComunidades.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchComunidades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔁 fetchMisComunidades
      .addCase(fetchMisComunidades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMisComunidades.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchMisComunidades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔁 fetchCommunityBySlug
      .addCase(fetchCommunityBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.comunidadActual = null;
      })
      .addCase(fetchCommunityBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.comunidadActual = action.payload;
      })
      .addCase(fetchCommunityBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.comunidadActual = null;
      });
  },
});

export const { setBusqueda, limpiarComunidadActual } = comunidadesSlice.actions;
export default comunidadesSlice.reducer;
