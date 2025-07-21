import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPromotionsByCommunity,
  getMyPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getAllPromotions,
} from "../api/promotionApi";

// 🔁 Obtener promociones por comunidad
export const fetchPromosPorComunidad = createAsyncThunk(
  "promociones/fetchPorComunidad",
  async (communityId, { rejectWithValue }) => {
    try {
      const data = await getPromotionsByCommunity(communityId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar promociones");
    }
  }
);

// 👤 Obtener promociones del usuario autenticado
export const fetchMisPromos = createAsyncThunk(
  "promociones/fetchMisPromos",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyPromotions();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar mis promociones"
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { promociones } = getState();
      return !promociones.loaded; // ❗️Evita la llamada si ya están cargadas
    },
  }
);

// ➕ Crear promoción
export const createPromo = createAsyncThunk(
  "promociones/create",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createPromotion(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear promoción");
    }
  }
);

// ✏️ Actualizar promoción
export const updatePromo = createAsyncThunk(
  "promociones/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const data = await updatePromotion(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al actualizar promoción");
    }
  }
);

// ❌ Eliminar promoción
export const deletePromo = createAsyncThunk(
  "promociones/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deletePromotion(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar promoción");
    }
  }
);

// 🌐 Obtener todas las promociones
export const fetchAllPromos = createAsyncThunk(
  "promociones/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllPromotions();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar todas las promociones"
      );
    }
  }
);

const promocionesSlice = createSlice({
  name: "promociones",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    loaded: false, // ✅ bandera para evitar doble carga
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔁 Promos por comunidad
      .addCase(fetchPromosPorComunidad.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromosPorComunidad.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchPromosPorComunidad.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👤 Mis promociones
      .addCase(fetchMisPromos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMisPromos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
        state.loaded = true; // ✅ se marca como ya cargado
      })
      .addCase(fetchMisPromos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Crear
      .addCase(createPromo.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })

      // ✏️ Actualizar
      .addCase(updatePromo.fulfilled, (state, action) => {
        const index = state.lista.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.lista[index] = action.payload;
        }
      })

      // ❌ Eliminar
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.lista = state.lista.filter((p) => p._id !== action.payload);
      })

      // 🌐 Todas las promociones
      .addCase(fetchAllPromos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPromos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchAllPromos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promocionesSlice.reducer;
