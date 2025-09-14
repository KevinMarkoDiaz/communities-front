import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBusinesses,
  getMyBusinesses,
  deleteBusiness, // sigue funcionando con id o slug (delegamos en la API)
  updateBusiness, // idem: delega internamente a idOrSlug
  createBusiness,
  getAllBusinessesByCommunity,
  getAllBusinessesForMap,
  getBusinessesForMapByCommunity,
} from "../api/businessApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions";

export const obtenerNegocios = createAsyncThunk(
  "negocios/fetch",
  async (
    { page = 1, all = false } = {},
    { rejectWithValue, dispatch, getState }
  ) => {
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
        limit: all ? 9999 : 15,
      };

      const res = await getAllBusinesses(params);
      return {
        negocios: res.businesses,
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

export const fetchNegociosMapa = createAsyncThunk(
  "negocios/fetchMapa",
  async (params = {}, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllBusinessesForMap(params);
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar negocios para el mapa",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar mapa");
    }
  }
);

export const fetchNegociosMapaPorComunidad = createAsyncThunk(
  "negocios/fetchMapaPorComunidad",
  async ({ communityId, coords }, { rejectWithValue, dispatch }) => {
    try {
      const data = await getBusinessesForMapByCommunity(communityId, {
        lat: coords.lat,
        lng: coords.lng,
      });
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message:
            "No se pudieron cargar negocios de la comunidad para el mapa",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar negocios");
    }
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

/* ────────────────────────────────────────────────────────────
   DELETE por id o slug (backward compatible)
   ──────────────────────────────────────────────────────────── */
export const deleteNegocio = createAsyncThunk(
  "negocios/delete",
  async (idOrSlug, { rejectWithValue, dispatch }) => {
    try {
      await deleteBusiness(idOrSlug); // la API acepta id o slug
      dispatch(
        mostrarFeedback({
          message: "Negocio eliminado con éxito",
          type: "success",
        })
      );
      return { idOrSlug };
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
    dispatch(mostrarFeedback({ message: "Procesando...", type: "loading" }));
    try {
      const res = await createBusiness(formData);
      dispatch(
        mostrarFeedback({
          message: "Negocio creado con éxito",
          type: "success",
        })
      );
      return res; // { msg, business }
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

/* ────────────────────────────────────────────────────────────
   UPDATE por id o slug (backward compatible)
   Acepta { idOrSlug, formData } o { id, formData }
   ──────────────────────────────────────────────────────────── */
export const updateBusinessThunk = createAsyncThunk(
  "negocios/update",
  async ({ idOrSlug, id, formData }, { rejectWithValue, dispatch }) => {
    dispatch(mostrarFeedback({ message: "Procesando...", type: "loading" }));
    try {
      const key = idOrSlug ?? id; // compat
      const res = await updateBusiness(key, formData); // API acepta id o slug
      dispatch(
        mostrarFeedback({
          message: "Negocio actualizado con éxito",
          type: "success",
        })
      );
      return res; // { msg, business }
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
  negociosMapa: [],
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
        state.lista = action.payload.negocios || [];
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

      .addCase(fetchNegociosMapa.fulfilled, (state, action) => {
        state.negociosMapa = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchNegociosMapa.rejected, (state, action) => {
        state.negociosMapa = [];
        state.error = action.payload;
      })

      .addCase(fetchNegociosMapaPorComunidad.fulfilled, (state, action) => {
        state.negociosMapa = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchNegociosMapaPorComunidad.rejected, (state, action) => {
        state.negociosMapa = [];
        state.error = action.payload;
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

      // Crear: si viene el negocio, sincroniza listas
      .addCase(createBusinessThunk.fulfilled, (state, action) => {
        const b = action.payload?.business;
        if (!b) return;
        // Opcional: insertar al principio si estás en "mis negocios"
        state.misNegocios.unshift(b);
        // También puedes pushear en lista general si aplica tu UX:
        // state.lista.unshift(b);
      })

      // Update: sincroniza en lista y misNegocios por _id
      .addCase(updateBusinessThunk.fulfilled, (state, action) => {
        const b = action.payload?.business;
        if (!b) return;
        state.lista = state.lista.map((x) => (x._id === b._id ? b : x));
        state.misNegocios = state.misNegocios.map((x) =>
          x._id === b._id ? b : x
        );
      })

      // Delete: ahora payload trae { idOrSlug }
      .addCase(deleteNegocio.fulfilled, (state, action) => {
        const key = action.payload?.idOrSlug;
        if (!key) return;
        state.misNegocios = state.misNegocios.filter(
          (n) => n._id !== key && n.slug !== key
        );
        state.lista = state.lista.filter(
          (n) => n._id !== key && n.slug !== key
        );
      })

      .addCase(resetApp, () => initialState);
  },
});

export const { setBusqueda, setCategoria } = negociosSlice.actions;
export default negociosSlice.reducer;
