import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEvents,
  getMyEvents,
  deleteEvent,
  updateEvent,
  createEvent,
} from "../api/eventApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅ Importar acción global

// ✅ Estado inicial
const initialState = {
  lista: [],
  misEventos: [],
  loading: false,
  misLoading: false,
  error: null,
  busqueda: "",
  loaded: false,
  misLoaded: false,
  paginaActual: 1,
  limite: 15,
  totalPaginas: 1,
  totalResultados: 0,
};

// 🔁 Todos los eventos
export const obtenerEventos = createAsyncThunk(
  "eventos/fetch",
  async (
    { page = 1, limit = 15 } = {}, // ⚠️ acá no llegan lat/lng directamente
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      // ✅ Obtenemos coords del slice de ubicación
      const { coords } = getState().ubicacion;
      const lat = coords?.lat;
      const lng = coords?.lng;

      // ✅ Pasamos todo a la API
      const data = await getAllEvents({ page, limit, lat, lng });
      return data;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar los eventos",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar eventos");
    }
  },
  {
    // ✅ Solo si aún no están cargados
    condition: (_, { getState }) => !getState().eventos.loaded,
  }
);
// 🔁 Solo mis eventos
export const fetchMisEventos = createAsyncThunk(
  "eventos/fetchMine",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getMyEvents();
      return Array.isArray(data) ? data : data.events || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus eventos",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al cargar tus eventos");
    }
  },
  {
    condition: (_, { getState }) => !getState().eventos.misLoaded,
  }
);

// Crear evento
export const createEventThunk = createAsyncThunk(
  "eventos/createEvent",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const res = await createEvent(formData);
      dispatch(
        mostrarFeedback({
          message: "Evento creado exitosamente",
          type: "success",
        })
      );
      return res;
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: err?.response?.data?.message || err.message,
          type: "error",
        })
      );
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// Actualizar evento
export const updateEventThunk = createAsyncThunk(
  "eventos/updateEvent",
  async ({ id, formData, token }, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateEvent(id, formData, token);
      dispatch(
        mostrarFeedback({
          message: "Evento actualizado correctamente",
          type: "success",
        })
      );
      return response;
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: err?.response?.data?.message || err.message,
          type: "error",
        })
      );
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

// Eliminar evento
export const deleteEvento = createAsyncThunk(
  "eventos/deleteEvento",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await deleteEvent(id);
      dispatch(
        mostrarFeedback({
          message: "Evento eliminado con éxito",
          type: "success",
        })
      );
      return id;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo eliminar el evento",
          type: "error",
        })
      );
      return rejectWithValue(error.message || "Error al eliminar evento");
    }
  }
);

const eventosSlice = createSlice({
  name: "eventos",
  initialState,
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
    setPaginaActual: (state, action) => {
      state.paginaActual = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => initialState)

      .addCase(obtenerEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerEventos.fulfilled, (state, action) => {
        const { events, totalPages, totalResults, currentPage } =
          action.payload;

        state.loading = false;
        state.lista = events || [];
        state.totalPaginas = totalPages || 1;
        state.totalResultados = totalResults || 0;
        state.paginaActual = currentPage || 1;
        state.loaded = true;
      })
      .addCase(obtenerEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔁 Mis eventos
      .addCase(fetchMisEventos.pending, (state) => {
        state.misLoading = true;
        state.error = null;
      })
      .addCase(fetchMisEventos.fulfilled, (state, action) => {
        state.misLoading = false;
        state.misEventos = Array.isArray(action.payload) ? action.payload : [];
        state.misLoaded = true;
      })
      .addCase(fetchMisEventos.rejected, (state, action) => {
        state.misLoading = false;
        state.error = action.payload;
        state.misLoaded = true;
      })

      // 🗑️ Eliminar evento
      .addCase(deleteEvento.fulfilled, (state, action) => {
        state.lista = state.lista.filter((e) => e._id !== action.payload);
        state.misEventos = state.misEventos.filter(
          (e) => e._id !== action.payload
        );
      });
  },
});

export const { setBusqueda, setPaginaActual } = eventosSlice.actions;
export default eventosSlice.reducer;
