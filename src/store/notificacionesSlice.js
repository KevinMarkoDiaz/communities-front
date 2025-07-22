import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/api/axiosInstance";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅

// 🚀 Thunk para cargar notificaciones
export const cargarNotificaciones = createAsyncThunk(
  "notificaciones/cargar",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get("/notifications");
      return Array.isArray(res.data) ? res.data : res.data.notifications || [];
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus notificaciones",
          type: "error",
        })
      );
      return rejectWithValue("Error al cargar notificaciones");
    }
  },
  {
    condition: (_, { getState }) => {
      const { notificaciones } = getState();
      return !notificaciones.loaded;
    },
  }
);

// 🚀 Thunk para marcar una como leída
export const marcarNotificacionLeida = createAsyncThunk(
  "notificaciones/marcarLeida",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.patch(`/notifications/${id}/read`);
      return id;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo marcar la notificación como leída",
          type: "error",
        })
      );
      return rejectWithValue("Error al marcar notificación");
    }
  }
);

// 🚀 Nuevo Thunk: marcar todas como leídas
export const marcarTodasNotificacionesLeidas = createAsyncThunk(
  "notificaciones/marcarTodasLeidas",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.patch("/notifications/read-all");
      return true;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron marcar todas las notificaciones",
          type: "error",
        })
      );
      return rejectWithValue("Error al marcar todas las notificaciones");
    }
  }
);

// ✅ Estado inicial reutilizable para reset
const initialState = {
  items: [],
  loading: false,
  error: null,
  loaded: false,
};

const notificacionesSlice = createSlice({
  name: "notificaciones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cargarNotificaciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cargarNotificaciones.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.loaded = true;
      })
      .addCase(cargarNotificaciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(marcarNotificacionLeida.fulfilled, (state, action) => {
        state.items = state.items.map((n) =>
          n._id === action.payload ? { ...n, read: true } : n
        );
      })

      .addCase(marcarTodasNotificacionesLeidas.fulfilled, (state) => {
        state.items = state.items.map((n) => ({ ...n, read: true }));
      })

      .addCase(resetApp, () => initialState); // ✅ Reset global
  },
});

export default notificacionesSlice.reducer;
