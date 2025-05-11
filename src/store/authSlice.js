import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usuario: null, // null = no logueado
  },
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload
    },
    logout: (state) => {
      state.usuario = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
