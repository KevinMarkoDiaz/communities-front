import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCommunities, getMyCommunities } from "../api/communityApi";

// 🔁 Thunk para obtener todas
export const fetchComunidades = createAsyncThunk(
  "comunidades/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCommunities();
      return data.communities;
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido");
    }
  }
);

// 🔁 Thunk para obtener solo las del usuario autenticado
export const fetchMisComunidades = createAsyncThunk(
  "comunidades/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyCommunities();
      return data.communities;
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido");
    }
  }
);

const comunidadesSlice = createSlice({
  name: "comunidades",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "",
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComunidades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComunidades.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchComunidades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMisComunidades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMisComunidades.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchMisComunidades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBusqueda } = comunidadesSlice.actions;
export default comunidadesSlice.reducer;
