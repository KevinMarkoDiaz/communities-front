import { configureStore } from "@reduxjs/toolkit";
import negociosReducer from "./negociosSlice";
import eventosReducer from "./eventosSlice";
import authReducer from "./authSlice";
import comunidadesReducer from "./comunidadesSlice";
import busquedaGlobalReducer from "./busquedaGlobalSlice";
import categoriasReducer from "./categoriasSlice";
import promocionesReducer from "./promocionesSlice";
import notificacionesReducer from "./notificacionesSlice";
import followReducer from "./followSlice";
import conversationsReducer from "./conversationsSlice";
import messagesReducer from "./messagesSlice";
import metricsReducer from "./metricsSlice";
import feedbackReducer from "./feedbackSlice";
import mobileMenuReducer from "./mobileMenuSlice";
import comunidadSeleccionadaReducer from "./comunidadSeleccionadaSlice";

export const store = configureStore({
  reducer: {
    negocios: negociosReducer,
    eventos: eventosReducer,
    auth: authReducer,
    comunidades: comunidadesReducer,
    busquedaGlobal: busquedaGlobalReducer,
    categorias: categoriasReducer,
    promociones: promocionesReducer,
    notificaciones: notificacionesReducer,
    follow: followReducer,
    conversations: conversationsReducer,
    messages: messagesReducer,
    metrics: metricsReducer,
    feedback: feedbackReducer,
    mobileMenu: mobileMenuReducer,
    comunidadSeleccionada: comunidadSeleccionadaReducer,
  },
});
