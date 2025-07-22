import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommunityMetrics,
  getCommunityMetricsByDate,
  getCommunityDailyViews,
  getCommunityTopViewers,
  getBusinessMetrics,
  getBusinessMetricsByDate,
  getBusinessDailyViews,
  getBusinessTopViewers,
  getEventMetrics,
  getEventMetricsByDate,
  getEventDailyViews,
  getEventTopViewers,
} from "../api/metricsApi";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅

const apiMap = {
  community: {
    getMetrics: getCommunityMetrics,
    getMetricsByDate: getCommunityMetricsByDate,
    getDailyViews: getCommunityDailyViews,
    getTopViewers: getCommunityTopViewers,
  },
  business: {
    getMetrics: getBusinessMetrics,
    getMetricsByDate: getBusinessMetricsByDate,
    getDailyViews: getBusinessDailyViews,
    getTopViewers: getBusinessTopViewers,
  },
  event: {
    getMetrics: getEventMetrics,
    getMetricsByDate: getEventMetricsByDate,
    getDailyViews: getEventDailyViews,
    getTopViewers: getEventTopViewers,
  },
};

// ✅ Estado inicial separado
const initialState = {
  entities: {},
  loading: false,
  error: null,
};

// Métricas generales
export const fetchMetrics = createAsyncThunk(
  "metrics/fetchMetrics",
  async ({ entityType, entityId }, { rejectWithValue, dispatch }) => {
    try {
      const data = await apiMap[entityType].getMetrics(entityId);
      return { entityId, data: data.data };
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar las métricas generales",
          type: "error",
        })
      );
      return rejectWithValue(err.message || "Error al obtener métricas");
    }
  }
);

// Métricas por fecha
export const fetchMetricsByDate = createAsyncThunk(
  "metrics/fetchMetricsByDate",
  async (
    { entityType, entityId, startDate, endDate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = await apiMap[entityType].getMetricsByDate(
        entityId,
        startDate,
        endDate
      );
      return { entityId, startDate, endDate, data: data.data };
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar las métricas filtradas",
          type: "error",
        })
      );
      return rejectWithValue(err.message || "Error al obtener métricas");
    }
  }
);

// Visitas diarias
export const fetchDailyViews = createAsyncThunk(
  "metrics/fetchDailyViews",
  async (
    { entityType, entityId, startDate, endDate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const data = await apiMap[entityType].getDailyViews(
        entityId,
        startDate,
        endDate
      );
      return { entityId, startDate, endDate, data: data.data };
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar las vistas diarias",
          type: "error",
        })
      );
      return rejectWithValue(err.message || "Error al obtener vistas diarias");
    }
  }
);

// Top viewers
export const fetchTopViewers = createAsyncThunk(
  "metrics/fetchTopViewers",
  async (
    { entityType, entityId, startDate, endDate, limit },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await apiMap[entityType].getTopViewers(
        entityId,
        startDate,
        endDate,
        limit
      );
      return { entityId, startDate, endDate, data: res.data };
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo cargar el ranking de visitantes",
          type: "error",
        })
      );
      return rejectWithValue(err.message || "Error al obtener ranking");
    }
  }
);

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    clearMetrics(state) {
      state.entities = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ Reinicio global
      .addCase(resetApp, () => initialState)

      // General metrics
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.loading = false;
        const { entityId, data } = action.payload;
        if (!state.entities[entityId]) state.entities[entityId] = {};
        state.entities[entityId].general = data;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Filtered metrics
      .addCase(fetchMetricsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetricsByDate.fulfilled, (state, action) => {
        state.loading = false;
        const { entityId, data, startDate, endDate } = action.payload;
        if (!state.entities[entityId]) state.entities[entityId] = {};
        const key = `${startDate}_${endDate}`;
        if (!state.entities[entityId].filtered)
          state.entities[entityId].filtered = {};
        state.entities[entityId].filtered[key] = data;
      })
      .addCase(fetchMetricsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Daily views
      .addCase(fetchDailyViews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyViews.fulfilled, (state, action) => {
        state.loading = false;
        const { entityId, data, startDate, endDate } = action.payload;
        if (!state.entities[entityId]) state.entities[entityId] = {};
        const key = `${startDate}_${endDate}`;
        if (!state.entities[entityId].daily)
          state.entities[entityId].daily = {};
        state.entities[entityId].daily[key] = data;
      })
      .addCase(fetchDailyViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Top viewers
      .addCase(fetchTopViewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopViewers.fulfilled, (state, action) => {
        state.loading = false;
        const { entityId, data, startDate, endDate } = action.payload;
        if (!state.entities[entityId]) state.entities[entityId] = {};
        const key = `${startDate}_${endDate}`;
        if (!state.entities[entityId].topViewers)
          state.entities[entityId].topViewers = {};
        state.entities[entityId].topViewers[key] = data;
      })
      .addCase(fetchTopViewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMetrics } = metricsSlice.actions;
export default metricsSlice.reducer;
