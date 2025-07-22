import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCommunities,
  getMyCommunities,
  createCommunity,
  updateCommunity,
  getCommunityById,
} from "../api/communityApi";
import { mostrarFeedback } from "./feedbackSlice";

export const fetchComunidades = createAsyncThunk(
  "comunidades/fetchAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllCommunities();
      return data.communities;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar las comunidades",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error desconocido");
    }
  },
  {
    condition: (_, { getState }) => !getState().comunidades.loaded,
  }
);

export const fetchMisComunidades = createAsyncThunk(
  "comunidades/fetchMine",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getMyCommunities();
      return data.communities;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus comunidades",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error desconocido");
    }
  },
  {
    condition: (_, { getState }) => !getState().comunidades.misLoaded,
  }
);

export const fetchCommunityById = createAsyncThunk(
  "comunidades/fetchById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const data = await getCommunityById(id);
      return data.community;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo cargar la comunidad",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "No se pudo cargar la comunidad");
    }
  }
);

export const createCommunityThunk = createAsyncThunk(
  "comunidades/create",
  async (formData, thunkAPI) => {
    try {
      return await createCommunity(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);

export const updateCommunityThunk = createAsyncThunk(
  "comunidades/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateCommunity(id, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message
      );
    }
  }
);

const comunidadesSlice = createSlice({
  name: "comunidades",
  initialState: {
    lista: [],
    misComunidades: [],
    comunidadActual: null,
    loadingLista: false,
    loadingMis: false,
    loadingDetalle: false,
    error: null,
    busqueda: "",
    loaded: false,
    misLoaded: false,
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
    limpiarComunidadActual: (state) => {
      state.comunidadActual = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComunidades.pending, (state) => {
        state.loadingLista = true;
        state.error = null;
      })
      .addCase(fetchComunidades.fulfilled, (state, action) => {
        state.loadingLista = false;
        state.lista = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComunidades.rejected, (state, action) => {
        state.loadingLista = false;
        state.error = action.payload;
      })
      .addCase(fetchMisComunidades.pending, (state) => {
        state.loadingMis = true;
        state.error = null;
      })
      .addCase(fetchMisComunidades.fulfilled, (state, action) => {
        state.loadingMis = false;
        state.misComunidades = action.payload;
        state.misLoaded = true;
      })
      .addCase(fetchMisComunidades.rejected, (state, action) => {
        state.loadingMis = false;
        state.error = action.payload;
      })
      .addCase(fetchCommunityById.pending, (state) => {
        state.loadingDetalle = true;
        state.error = null;
        state.comunidadActual = null;
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        state.loadingDetalle = false;
        state.comunidadActual = action.payload;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.loadingDetalle = false;
        state.error = action.payload;
        state.comunidadActual = null;
      });
  },
});

export const { setBusqueda, limpiarComunidadActual } = comunidadesSlice.actions;
export default comunidadesSlice.reducer;
