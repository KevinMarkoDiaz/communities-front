import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const obtenerUbicacionUsuario = createAsyncThunk(
  "ubicacion/obtener",
  async (_, { rejectWithValue }) => {
    // 🌐 🌴 DEV: Ubicación fake de Miami
    return {
      lat: 32.7767,
      lng: -96.797,
    };

    // 🌐 🌍 PROD: Descomentar para usar geolocalización real
    /*
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(rejectWithValue("Geolocalización no disponible"));
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          resolve({ lat, lng });
        },
        (err) => {
          reject(rejectWithValue(err.message || "Error al obtener ubicación"));
        },
        { timeout: 10000 }
      );
    });
    */
  }
);

const ubicacionSlice = createSlice({
  name: "ubicacion",
  initialState: {
    coords: null,
    cargando: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(obtenerUbicacionUsuario.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(obtenerUbicacionUsuario.fulfilled, (state, action) => {
        state.coords = action.payload;
        state.cargando = false;
      })
      .addCase(obtenerUbicacionUsuario.rejected, (state, action) => {
        state.error = action.payload;
        state.cargando = false;
      });
  },
});

export default ubicacionSlice.reducer;
