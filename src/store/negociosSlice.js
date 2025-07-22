import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBusinesses,
  getMyBusinesses,
  deleteBusiness,
  updateBusiness,
  createBusiness,
} from "../api/businessApi";
import { mostrarFeedback } from "./feedbackSlice";

// 🔁 Todos los negocios
export const obtenerNegocios = createAsyncThunk(
  "negocios/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllBusinesses();
      return Array.isArray(data) ? data : data.businesses || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar los negocios",
          type: "error",
        })
      );
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
      return negocios.misNegocios.length === 0;
    },
  }
);

// ❌ Eliminar un negocio
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

// ✅ Crear negocio
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

// ✏️ Editar negocio
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

const negociosSlice = createSlice({
  name: "negocios",
  initialState: {
    lista: [],
    misNegocios: [],
    loading: false,
    misLoading: false,
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
