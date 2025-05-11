import { configureStore } from "@reduxjs/toolkit"
import negociosReducer from "./negociosSlice"

export const store = configureStore({
  reducer: {
    negocios: negociosReducer,
  },
})
