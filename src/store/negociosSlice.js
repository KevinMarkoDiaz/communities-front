import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchNegocios } from "../utils/api"

// thunk para cargar los negocios
export const obtenerNegocios = createAsyncThunk(
  "negocios/fetch",
  async () => {
    const data = await fetchNegocios()
    return data
  }
)

const negociosSlice = createSlice({
  name: "negocios",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "",
    categoria: "todas", // valor por defecto
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload
    },
    setCategoria: (state, action) => {
      state.categoria = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerNegocios.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(obtenerNegocios.fulfilled, (state, action) => {
        state.loading = false
        state.lista = action.payload
      })
      .addCase(obtenerNegocios.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export const { setBusqueda, setCategoria } = negociosSlice.actions

export default negociosSlice.reducer
