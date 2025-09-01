// src/store/authSelectors.js
export const selectUsuario = (s) => s.auth.usuario;
export const selectAuthLoading = (s) => s.auth.loading;
export const selectAuthError = (s) => s.auth.error;
export const selectIsAuthenticated = (s) => Boolean(s.auth.usuario);
