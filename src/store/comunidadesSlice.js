import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchComunidades } from "../utils/api"

// Thunk para cargar las comunidades
export const obtenerComunidades = createAsyncThunk(
  "comunidades/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchComunidades()
      if (!data || data.error) {
        return rejectWithValue(data.error || "Error al obtener comunidades")
      }
      return data
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido")
    }
  }
)

const comunidadesSlice = createSlice({
  name: "comunidades",
  initialState: {
    lista: [],
    loading: false,
    error: null,
    busqueda: "",
  },
  reducers: {
    setBusqueda: (state, action) => {
      state.busqueda = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtenerComunidades.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(obtenerComunidades.fulfilled, (state, action) => {
        state.loading = false
        state.lista = action.payload
      })
      .addCase(obtenerComunidades.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const { setBusqueda } = comunidadesSlice.actions
export default comunidadesSlice.reducer
