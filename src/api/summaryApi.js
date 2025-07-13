import axiosInstance from "./axiosInstance";

// Negocio
export const getBusinessSummary = (id) =>
  axiosInstance.get(`/business-views/${id}/summary`);

// Comunidad
export const getCommunitySummary = (id) =>
  axiosInstance.get(`/communities-views/${id}/summary`);

// Evento
export const getEventSummary = (id) =>
  axiosInstance.get(`/events-views/${id}/summary`);
