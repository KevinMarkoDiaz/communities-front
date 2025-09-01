import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const obtenerUbicacionUsuario = createAsyncThunk(
  "ubicacion/obtener",
  async () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn("Geolocalización no disponible, usando Dallas");
        return resolve({ lat: 32.7767, lng: -96.797 });
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          resolve({ lat, lng });
        },
        (err) => {
          console.warn("Error o permiso denegado:", err);
          // fallback Dallas
          resolve({ lat: 32.7767, lng: -96.797 });
        },
        { timeout: 10000 }
      );
    });
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
