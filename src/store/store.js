import { configureStore } from "@reduxjs/toolkit";
import negociosReducer from "./negociosSlice";
import eventosReducer from "./eventosSlice";
import authReducer from "./authSlice";
import comunidadesReducer from "./comunidadesSlice";
import busquedaGlobalReducer from "./busquedaGlobalSlice"; // 🆕
import categoriasReducer from "./categoriasSlice"; // nuevo

export const store = configureStore({
  reducer: {
    negocios: negociosReducer,
    eventos: eventosReducer,
    auth: authReducer,
    comunidades: comunidadesReducer,
    busquedaGlobal: busquedaGlobalReducer, // 🆕 agregado
    categorias: categoriasReducer,
  },
});
