import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../api/categoryApi";
import { mostrarFeedback } from "./feedbackSlice";

// 🔁 Thunk para cargar desde la API con condición
export const fetchCategorias = createAsyncThunk(
  "categorias/fetchCategorias",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await getAllCategories();
      return res.categories;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar las categorías",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar categorías");
    }
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
    loaded: false,
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
        state.loaded = true;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriasSlice.reducer;
