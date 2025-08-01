import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCommunities,
  getMyCommunities,
  createCommunity,
  updateCommunity,
  getCommunityById,
} from "../api/communityApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅

export const fetchComunidades = createAsyncThunk(
  "comunidades/fetchAll",
  async ({ lat, lng, page = 1 } = {}, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllCommunities({ lat, lng, page });
      return {
        comunidades: data.communities,
        totalPages: Math.ceil(data.total / data.perPage),
        currentPage: data.page,
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
    condition: (_, { getState }) => !getState().comunidades.misLoaded,
  }
);

export const fetchCommunityById = createAsyncThunk(
  "comunidades/fetchById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const data = await getCommunityById(id);
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

export const createCommunityThunk = createAsyncThunk(
  "comunidades/create",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await createCommunity(formData);
      dispatch(
        mostrarFeedback({
          message: "Comunidad creada exitosamente",
          type: "success",
        })
      );
      return response;
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

export const updateCommunityThunk = createAsyncThunk(
  "comunidades/update",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateCommunity(id, formData);
      dispatch(
        mostrarFeedback({
          message: "Comunidad actualizada exitosamente",
          type: "success",
        })
      );
      return response;
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

// ✅ Estado inicial
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
      .addCase(resetApp, () => initialState) // ✅ Reset global

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

      // Por ID
      .addCase(fetchCommunityById.pending, (state) => {
        state.loadingDetalle = true;
        state.error = null;
        state.comunidadActual = null;
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        state.loadingDetalle = false;
        state.comunidadActual = action.payload;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.loadingDetalle = false;
        state.error = action.payload;
        state.comunidadActual = null;
      });
  },
});

export const { setBusqueda, limpiarComunidadActual, resetMisComunidades } =
  comunidadesSlice.actions;

export default comunidadesSlice.reducer;
