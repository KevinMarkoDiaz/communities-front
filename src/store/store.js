import { configureStore } from "@reduxjs/toolkit"
import negociosReducer from "./negociosSlice"
import eventosReducer from "./eventosSlice"
export const store = configureStore({
  reducer: {
    negocios: negociosReducer,
    eventos: eventosReducer,
  },
})
