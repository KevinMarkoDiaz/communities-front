import { configureStore } from "@reduxjs/toolkit"
import negociosReducer from "./negociosSlice"
import eventosReducer from "./eventosSlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    negocios: negociosReducer,
    eventos: eventosReducer,
    auth: authReducer,
  },
})
