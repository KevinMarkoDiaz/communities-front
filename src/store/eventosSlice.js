import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchEventos } from "../utils/api"

export const obtenerEventos = createAsyncThunk(
  "eventos/fetch",
  async () => {
    const data = await fetchEventos()
    return data
  }
)

const eventosSlice = createSlice({
  name: "eventos",
  initialState: {
    lista: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerEventos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(obtenerEventos.fulfilled, (state, action) => {
        state.loading = false
        state.lista = action.payload
      })
      .addCase(obtenerEventos.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default eventosSlice.reducer
