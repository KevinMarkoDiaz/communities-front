import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../api/categoryApi";

// 🔁 Thunk para cargar desde la API con condición
export const fetchCategorias = createAsyncThunk(
  "categorias/fetchCategorias",
  async () => {
    const res = await getAllCategories();
    return res.categories;
  },
  {
    condition: (_, { getState }) => {
      const { categorias } = getState();
      return !categorias.loaded;
    },
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    data: [],
    loading: false,
    error: null,
    loaded: false, // ✅ nuevo flag
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.loaded = true; // ✅ lo marcamos como cargado
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriasSlice.reducer;
