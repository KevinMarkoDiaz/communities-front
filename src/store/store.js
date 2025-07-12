import { configureStore } from "@reduxjs/toolkit";
import negociosReducer from "./negociosSlice";
import eventosReducer from "./eventosSlice";
import authReducer from "./authSlice";
import comunidadesReducer from "./comunidadesSlice";
import busquedaGlobalReducer from "./busquedaGlobalSlice"; // 🆕
import categoriasReducer from "./categoriasSlice"; // nuevo
import promocionesReducer from "./promocionesSlice";
import notificacionesReducer from "./notificacionesSlice";
import followReducer from "./followSlice";

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
  },
});
