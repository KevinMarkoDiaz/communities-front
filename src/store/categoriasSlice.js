import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../api/categoryApi";

// Thunk para cargar desde la API
export const fetchCategorias = createAsyncThunk(
  "categorias/fetchCategorias",
  async () => {
    const res = await getAllCategories();
    return res.categories;
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    data: [],
    loading: false,
    error: null,
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
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriasSlice.reducer;
