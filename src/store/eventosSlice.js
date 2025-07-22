import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllEvents,
  getMyEvents,
  deleteEvent,
  updateEvent,
  createEvent,
} from "../api/eventApi";
import { mostrarFeedback } from "./feedbackSlice";

// 🔁 Todos los eventos
export const obtenerEventos = createAsyncThunk(
  "eventos/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getAllEvents();
      return Array.isArray(data) ? data : data.events || [];
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
    condition: (_, { getState }) => {
      const state = getState().eventos;
      return !state.loaded;
    },
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
    condition: (_, { getState }) => {
      return getState().eventos.misEventos.length === 0;
    },
  }
);

// THUNK para crear evento
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

// 🗑️ Eliminar evento
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
  initialState: {
    lista: [],
    misEventos: [],
    loading: false,
    misLoading: false,
    error: null,
    busqueda: "",
    loaded: false,
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔁 Todos los eventos
      .addCase(obtenerEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(obtenerEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = Array.isArray(action.payload) ? action.payload : [];
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
      })
      .addCase(fetchMisEventos.rejected, (state, action) => {
        state.misLoading = false;
        state.error = action.payload;
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

export const { setBusqueda } = eventosSlice.actions;
export default eventosSlice.reducer;
