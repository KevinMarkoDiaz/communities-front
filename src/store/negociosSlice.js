import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBusinesses,
  getMyBusinesses,
  deleteBusiness,
} from "../api/businessApi";

// 🔁 Todos los negocios
export const obtenerNegocios = createAsyncThunk(
  "negocios/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllBusinesses();
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar negocios");
    }
  },
  {
    condition: (_, { getState }) => {
      const { negocios } = getState();
      return !negocios.loaded;
    },
  }
);

// 🔁 Solo mis negocios
export const fetchMisNegocios = createAsyncThunk(
  "negocios/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyBusinesses();
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar tus negocios");
    }
  },
  {
    condition: (_, { getState }) => {
      const { negocios } = getState();
      return negocios.misNegocios.length === 0;
    },
  }
);

// ❌ Eliminar un negocio
export const deleteNegocio = createAsyncThunk(
  "negocios/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBusiness(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar el negocio");
    }
  }
);

const negociosSlice = createSlice({
  name: "negocios",
  initialState: {
    lista: [], // Todos los negocios
    misNegocios: [], // ✅ Mis negocios
    loading: false,
    misLoading: false, // ✅ Carga de mis negocios
    error: null,
    busqueda: "",
    categoria: "todas",
    loaded: false,
  },
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
      // 🔁 Todos los negocios
      .addCase(obtenerNegocios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerNegocios.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
        state.loaded = true;
      })
      .addCase(obtenerNegocios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔁 Mis negocios
      .addCase(fetchMisNegocios.pending, (state) => {
        state.misLoading = true;
        state.error = null;
      })
      .addCase(fetchMisNegocios.fulfilled, (state, action) => {
        state.misLoading = false;
        state.misNegocios = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMisNegocios.rejected, (state, action) => {
        state.misLoading = false;
        state.error = action.payload;
      })

      // ❌ Eliminar negocio
      .addCase(deleteNegocio.fulfilled, (state, action) => {
        state.misNegocios = state.misNegocios.filter(
          (n) => n._id !== action.payload
        );
      })
      .addCase(deleteNegocio.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setBusqueda, setCategoria } = negociosSlice.actions;
export default negociosSlice.reducer;
