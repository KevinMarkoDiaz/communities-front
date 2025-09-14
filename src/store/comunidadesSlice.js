// src/store/comunidadesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCommunities,
  getMyCommunities,
  createCommunity,
  updateCommunity,
  getCommunityByIdOrSlug, // ✅ nuevo para aceptar slug o id
  deleteCommunity,
} from "../api/communityApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions";

/* ────────────────────────────────────────────────────────────
   Thunks
   ──────────────────────────────────────────────────────────── */

// 🌀 Obtener todas las comunidades
export const fetchComunidades = createAsyncThunk(
  "comunidades/fetchAll",
  async (
    { lat, lng, page = 1, limit = 15 } = {},
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = await getAllCommunities({ lat, lng, page, limit });
      return {
        comunidades: data.communities || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || page,
        totalResults: data.totalResults ?? 0,
      };
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
    condition: (_, { getState }) => !getState().comunidades.loaded,
  }
);

// 🧍 Obtener comunidades propias
export const fetchMisComunidades = createAsyncThunk(
  "comunidades/fetchMine",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getMyCommunities();
      return data.communities || [];
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
    condition: (_, { getState }) => !getState().comunidades.misLoaded,
  }
);

// 🔍 Obtener comunidad por id o slug
export const fetchCommunityByIdOrSlug = createAsyncThunk(
  "comunidades/fetchByIdOrSlug",
  async (idOrSlug, { rejectWithValue, dispatch }) => {
    try {
      const data = await getCommunityByIdOrSlug(idOrSlug);
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

// 🟢 Crear comunidad
export const createCommunityThunk = createAsyncThunk(
  "comunidades/create",
  async (formData, { rejectWithValue, dispatch }) => {
    dispatch(mostrarFeedback({ message: "Procesando...", type: "loading" }));
    try {
      const response = await createCommunity(formData);
      dispatch(
        mostrarFeedback({
          message: "Comunidad creada exitosamente",
          type: "success",
        })
      );
      return response; // { msg, community }
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: err?.response?.data?.message || "Error al crear comunidad",
          type: "error",
        })
      );
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// 🟡 Actualizar comunidad (id o slug)
export const updateCommunityThunk = createAsyncThunk(
  "comunidades/update",
  async ({ idOrSlug, formData }, { rejectWithValue, dispatch }) => {
    dispatch(mostrarFeedback({ message: "Procesando...", type: "loading" }));
    try {
      const response = await updateCommunity(idOrSlug, formData);
      dispatch(
        mostrarFeedback({
          message: "Comunidad actualizada exitosamente",
          type: "success",
        })
      );
      return response; // { msg, community }
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message:
            err?.response?.data?.message || "Error al actualizar comunidad",
          type: "error",
        })
      );
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// 🔴 Eliminar comunidad (id o slug)
export const deleteComunidad = createAsyncThunk(
  "comunidades/delete",
  async (idOrSlug, { rejectWithValue, dispatch }) => {
    dispatch(mostrarFeedback({ message: "Eliminando...", type: "loading" }));
    try {
      const resp = await deleteCommunity(idOrSlug);
      dispatch(
        mostrarFeedback({
          message: resp?.msg || "Comunidad eliminada",
          type: "success",
        })
      );
      return { idOrSlug };
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message:
            err?.response?.data?.message || "Error al eliminar comunidad",
          type: "error",
        })
      );
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

/* ────────────────────────────────────────────────────────────
   Slice
   ──────────────────────────────────────────────────────────── */

const initialState = {
  lista: [],
  misComunidades: [],
  comunidadActual: null,
  loadingLista: false,
  loadingMis: false,
  loadingDetalle: false,
  error: null,
  busqueda: "",
  loaded: false,
  misLoaded: false,
  totalPages: 1,
  currentPage: 1,
  totalResults: 0,
};

const comunidadesSlice = createSlice({
  name: "comunidades",
  initialState,
  reducers: {
    resetMisComunidades: () => initialState,
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
    limpiarComunidadActual: (state) => {
      state.comunidadActual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => initialState)

      // Todas
      .addCase(fetchComunidades.pending, (state) => {
        state.loadingLista = true;
        state.error = null;
      })
      .addCase(fetchComunidades.fulfilled, (state, action) => {
        state.loadingLista = false;
        state.lista = action.payload.comunidades;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalResults = action.payload.totalResults;
        state.loaded = true;
      })
      .addCase(fetchComunidades.rejected, (state, action) => {
        state.loadingLista = false;
        state.error = action.payload;
      })

      // Mías
      .addCase(fetchMisComunidades.pending, (state) => {
        state.loadingMis = true;
        state.error = null;
      })
      .addCase(fetchMisComunidades.fulfilled, (state, action) => {
        state.loadingMis = false;
        state.misComunidades = action.payload;
        state.misLoaded = true;
      })
      .addCase(fetchMisComunidades.rejected, (state, action) => {
        state.loadingMis = false;
        state.error = action.payload;
      })

      // Detalle
      .addCase(fetchCommunityByIdOrSlug.pending, (state) => {
        state.loadingDetalle = true;
        state.error = null;
        state.comunidadActual = null;
      })
      .addCase(fetchCommunityByIdOrSlug.fulfilled, (state, action) => {
        state.loadingDetalle = false;
        state.comunidadActual = action.payload;
      })
      .addCase(fetchCommunityByIdOrSlug.rejected, (state, action) => {
        state.loadingDetalle = false;
        state.error = action.payload;
        state.comunidadActual = null;
      })

      // Crear
      .addCase(createCommunityThunk.fulfilled, (state, action) => {
        const c = action.payload?.community;
        if (c) {
          state.lista.unshift(c);
          state.misComunidades.unshift(c);
        }
      })

      // Update
      .addCase(updateCommunityThunk.fulfilled, (state, action) => {
        const c = action.payload?.community;
        if (!c) return;
        state.lista = state.lista.map((x) => (x._id === c._id ? c : x));
        state.misComunidades = state.misComunidades.map((x) =>
          x._id === c._id ? c : x
        );
        if (state.comunidadActual?._id === c._id) {
          state.comunidadActual = c;
        }
      })

      // Delete
      .addCase(deleteComunidad.fulfilled, (state, action) => {
        const idOrSlug = action.payload.idOrSlug;
        state.lista = state.lista.filter(
          (c) => c._id !== idOrSlug && c.slug !== idOrSlug
        );
        state.misComunidades = state.misComunidades.filter(
          (c) => c._id !== idOrSlug && c.slug !== idOrSlug
        );
        if (
          state.comunidadActual &&
          (state.comunidadActual._id === idOrSlug ||
            state.comunidadActual.slug === idOrSlug)
        ) {
          state.comunidadActual = null;
        }
      });
  },
});

export const { setBusqueda, limpiarComunidadActual, resetMisComunidades } =
  comunidadesSlice.actions;

export default comunidadesSlice.reducer;
