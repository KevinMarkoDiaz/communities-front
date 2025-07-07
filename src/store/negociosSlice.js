// src/store/negociosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBusinesses, getMyBusinesses } from "../api/businessApi";

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
  }
);

const negociosSlice = createSlice({
  name: "negocios",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "",
    categoria: "todas",
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
      // Todos los negocios
      .addCase(obtenerNegocios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerNegocios.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(obtenerNegocios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Solo mis negocios
      .addCase(fetchMisNegocios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMisNegocios.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMisNegocios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBusqueda, setCategoria } = negociosSlice.actions;
export default negociosSlice.reducer;
