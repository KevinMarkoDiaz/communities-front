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

// Mapeo de entidades a sus funciones
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

/**
 * Carga métricas generales
 */
export const fetchMetrics = createAsyncThunk(
  "metrics/fetchMetrics",
  async ({ entityType, entityId }) => {
    const data = await apiMap[entityType].getMetrics(entityId);
    return data.data;
  }
);

/**
 * Carga métricas filtradas por fecha
 */
export const fetchMetricsByDate = createAsyncThunk(
  "metrics/fetchMetricsByDate",
  async ({ entityType, entityId, startDate, endDate }) => {
    const data = await apiMap[entityType].getMetricsByDate(
      entityId,
      startDate,
      endDate
    );
    return data.data;
  }
);

/**
 * Carga visitas diarias
 */
export const fetchDailyViews = createAsyncThunk(
  "metrics/fetchDailyViews",
  async ({ entityType, entityId, startDate, endDate }) => {
    const data = await apiMap[entityType].getDailyViews(
      entityId,
      startDate,
      endDate
    );
    return data.data;
  }
);

/**
 * Carga ranking de visitantes
 */
export const fetchTopViewers = createAsyncThunk(
  "metrics/fetchTopViewers",
  async ({ entityType, entityId, startDate, endDate, limit }) => {
    const res = await apiMap[entityType].getTopViewers(
      entityId,
      startDate,
      endDate,
      limit
    );
    console.log("🔵 fetchTopViewers RAW RESPONSE", res);
    return res.data;
  }
);

const metricsSlice = createSlice({
  name: "metrics",
  initialState: {
    data: null,
    filteredData: null,
    dailyData: [],
    topViewers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMetrics(state) {
      state.data = null;
      state.filteredData = null;
      state.dailyData = [];
      state.topViewers = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // General metrics
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Metrics by date
      .addCase(fetchMetricsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetricsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredData = action.payload;
      })
      .addCase(fetchMetricsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Daily views
      .addCase(fetchDailyViews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyViews.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyData = action.payload;
      })
      .addCase(fetchDailyViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Top viewers
      .addCase(fetchTopViewers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopViewers.fulfilled, (state, action) => {
        state.loading = false;
        state.topViewers = action.payload;
      })
      .addCase(fetchTopViewers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMetrics } = metricsSlice.actions;

export default metricsSlice.reducer;
