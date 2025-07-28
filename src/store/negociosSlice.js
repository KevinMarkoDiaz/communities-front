// ✅ negociosSlice.js completo con paginación geolocalizada
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBusinesses,
  getMyBusinesses,
  deleteBusiness,
  updateBusiness,
  createBusiness,
  getAllBusinessesByCommunity,
} from "../api/businessApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions";

export const obtenerNegocios = createAsyncThunk(
  "negocios/fetch",
  async ({ page = 1 } = {}, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const coords = state.ubicacion?.coords;

      if (!coords?.lat || !coords?.lng) {
        return rejectWithValue("Ubicación no disponible");
      }

      const params = {
        lat: coords.lat,
        lng: coords.lng,
        page,
        limit: 15,
      };

      const res = await getAllBusinesses(params);

      return {
        negocios: res,
        totalPages: Math.ceil(res.total / res.perPage),
        currentPage: res.page,
      };
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar los negocios",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar negocios");
    }
  }
);

export const fetchNegociosPorComunidad = createAsyncThunk(
  "negocios/fetchPorComunidad",
  async (communityId, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllBusinessesByCommunity(communityId);
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar los negocios de la comunidad",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar negocios");
    }
  },
  {
    condition: (communityId, { getState }) => {
      const { negocios } = getState();
      return !negocios.loaded || negocios.lista.length === 0;
    },
  }
);

export const fetchMisNegocios = createAsyncThunk(
  "negocios/fetchMine",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getMyBusinesses();
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus negocios",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar tus negocios");
    }
  },
  {
    condition: (_, { getState }) => {
      const { negocios } = getState();
      return !negocios.misLoaded;
    },
  }
);

export const deleteNegocio = createAsyncThunk(
  "negocios/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await deleteBusiness(id);
      dispatch(
        mostrarFeedback({
          message: "Negocio eliminado con éxito",
          type: "success",
        })
      );
      return id;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo eliminar el negocio",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al eliminar el negocio");
    }
  }
);

export const createBusinessThunk = createAsyncThunk(
  "negocios/create",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const res = await createBusiness(formData);
      dispatch(
        mostrarFeedback({
          message: "Negocio creado con éxito",
          type: "success",
        })
      );
      return res;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: error?.response?.data?.message || "Error al crear negocio",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al crear negocio");
    }
  }
);

export const updateBusinessThunk = createAsyncThunk(
  "negocios/update",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const res = await updateBusiness(id, formData);
      dispatch(
        mostrarFeedback({
          message: "Negocio actualizado con éxito",
          type: "success",
        })
      );
      return res;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message:
            error?.response?.data?.message || "Error al actualizar negocio",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al actualizar negocio");
    }
  }
);

const initialState = {
  lista: [],
  misNegocios: [],
  loading: false,
  misLoading: false,
  error: null,
  busqueda: "",
  categoria: "todas",
  loaded: false,
  misLoaded: false,
  totalPages: 1,
  currentPage: 1,
};

const negociosSlice = createSlice({
  name: "negocios",
  initialState,
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
        state.loading = false;
        state.lista = Array.isArray(action.payload.negocios)
          ? action.payload.negocios
          : [];
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loaded = true;
      })
      .addCase(obtenerNegocios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchNegociosPorComunidad.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lista = [];
      })
      .addCase(fetchNegociosPorComunidad.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
        state.loaded = true;
      })
      .addCase(fetchNegociosPorComunidad.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.lista = [];
      })

      .addCase(fetchMisNegocios.pending, (state) => {
        state.misLoading = true;
        state.error = null;
      })
      .addCase(fetchMisNegocios.fulfilled, (state, action) => {
        state.misLoading = false;
        state.misNegocios = Array.isArray(action.payload) ? action.payload : [];
        state.misLoaded = true;
      })
      .addCase(fetchMisNegocios.rejected, (state, action) => {
        state.misLoading = false;
        state.error = action.payload;
        state.misLoaded = true;
      })

      .addCase(deleteNegocio.fulfilled, (state, action) => {
        state.misNegocios = state.misNegocios.filter(
          (n) => n._id !== action.payload
        );
      })
      .addCase(deleteNegocio.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(resetApp, () => initialState);
  },
});

export const { setBusqueda, setCategoria } = negociosSlice.actions;
export default negociosSlice.reducer;
