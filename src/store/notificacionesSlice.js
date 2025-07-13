import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/api/axiosInstance";

// 🚀 Thunk para cargar notificaciones
export const cargarNotificaciones = createAsyncThunk(
  "notificaciones/cargar",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/notifications");
      console.log("🚀 Respuesta de /notifications:", res.data);
      if (Array.isArray(res.data)) return res.data;
      return res.data.notifications || [];
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al cargar notificaciones");
    }
  }
);

// 🚀 Thunk para marcar una como leída
export const marcarNotificacionLeida = createAsyncThunk(
  "notificaciones/marcarLeida",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.patch(`/notifications/${id}/read`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al marcar notificación");
    }
  }
);

// 🚀 Nuevo Thunk: marcar todas como leídas
export const marcarTodasNotificacionesLeidas = createAsyncThunk(
  "notificaciones/marcarTodasLeidas",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.patch("/notifications/read-all");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Error al marcar todas las notificaciones"
      );
    }
  }
);

const notificacionesSlice = createSlice({
  name: "notificaciones",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cargar notificaciones
      .addCase(cargarNotificaciones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cargarNotificaciones.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(cargarNotificaciones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Marcar una como leída
      .addCase(marcarNotificacionLeida.fulfilled, (state, action) => {
        state.items = state.items.map((n) =>
          n._id === action.payload ? { ...n, read: true } : n
        );
      })
      // 🟢 NUEVO: Marcar todas como leídas
      .addCase(marcarTodasNotificacionesLeidas.fulfilled, (state) => {
        state.items = state.items.map((n) => ({ ...n, read: true }));
      });
  },
});

export default notificacionesSlice.reducer;
