import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { HelmetProvider } from "react-helmet-async";
import AuthLoader from "./AuthLoader"; // 👈 importalo

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <AuthLoader /> {/* 👈 lo montas aquí */}
        <AppRouter />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
