// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserApi } from '../api/authApi';

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await updateUserApi(userId, userData);
      return response; // data del usuario actualizado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    usuario: null,
    loading: false,
    error: null,
  },
  reducers: {
    login(state, action) {
      state.usuario = action.payload;
    },
    logout(state) {
      state.usuario = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

