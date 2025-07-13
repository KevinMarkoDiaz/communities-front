import axiosInstance from "./axiosInstance";

/* ---------------------------
   COMMUNITY METRICS
---------------------------- */

export const getCommunityMetrics = (id) =>
  axiosInstance.get(`/community-views/${id}/metrics`);

export const getCommunityMetricsByDate = (id, startDate, endDate) =>
  axiosInstance.get(`/community-views/${id}/metrics/filter`, {
    params: { startDate, endDate },
  });

export const getCommunityDailyViews = (id, startDate, endDate) =>
  axiosInstance.get(`/community-views/${id}/metrics/daily`, {
    params: { startDate, endDate },
  });

export const getCommunityTopViewers = (id, startDate, endDate, limit = 5) =>
  axiosInstance.get(`/community-views/${id}/metrics/top-viewers`, {
    params: { startDate, endDate, limit },
  });

/* ---------------------------
   BUSINESS METRICS
---------------------------- */

export const getBusinessMetrics = (id) =>
  axiosInstance.get(`/business-views/${id}/metrics`);

export const getBusinessMetricsByDate = (id, startDate, endDate) =>
  axiosInstance.get(`/business-views/${id}/metrics/filter`, {
    params: { startDate, endDate },
  });

export const getBusinessDailyViews = (id, startDate, endDate) =>
  axiosInstance.get(`/business-views/${id}/metrics/daily`, {
    params: { startDate, endDate },
  });

export const getBusinessTopViewers = (id, startDate, endDate, limit = 5) =>
  axiosInstance.get(`/business-views/${id}/metrics/top-viewers`, {
    params: { startDate, endDate, limit },
  });

/* ---------------------------
   EVENT METRICS
---------------------------- */

export const getEventMetrics = (id) =>
  axiosInstance.get(`/event-views/${id}/metrics`);

export const getEventMetricsByDate = (id, startDate, endDate) =>
  axiosInstance.get(`/event-views/${id}/metrics/filter`, {
    params: { startDate, endDate },
  });

export const getEventDailyViews = (id, startDate, endDate) =>
  axiosInstance.get(`/event-views/${id}/metrics/daily`, {
    params: { startDate, endDate },
  });

export const getEventTopViewers = (id, startDate, endDate, limit = 5) =>
  axiosInstance.get(`/event-views/${id}/metrics/top-viewers`, {
    params: { startDate, endDate, limit },
  });
