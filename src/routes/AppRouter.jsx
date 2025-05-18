import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Negocios from "../pages/Negocios";
import Eventos from "../pages/Eventos";
import Comunidadeshome from "../pages/Comunidades";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import NegocioDetalle from "../pages/NegocioDetalle";
import EventoDetalle from "../pages/EventoDetalle";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Perfil from "../pages/dashboard/Perfil";
import MisNegocios from "../pages/dashboard/MisNegocios";
import MisEventos from "../pages/dashboard/MisEventos";
import CrearNegocio from "../pages/dashboard/CrearNegocio";
import EditarNegocio from "../pages/dashboard/EditarNegocio";
import CrearEvento from "../pages/dashboard/CrearEvento";
import EditarEvento from "../pages/dashboard/EditarEvento";
import Categorias from "../pages/dashboard/Categorias";
import CrearCategoria from "../pages/dashboard/CrearCategoria";
import EditarCategoria from "../pages/dashboard/EditarCategoria";
import Comunidades from "../pages/dashboard/Comunidades";
import CrearComunidad from "../pages/dashboard/CrearComunidad";
import EditarComunidad from "../pages/dashboard/EditarComunidad";

import RutaPrivada from "../components/RutaPrivada";
import ComunidadDetalle from "../pages/ComunidadDetalle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/negocios", element: <Negocios /> },
      { path: "/negocios/:id", element: <NegocioDetalle /> },
      { path: "/eventos", element: <Eventos /> },
      { path: "/eventos/:id", element: <EventoDetalle /> },
      { path: "/eventos/:id", element: <EventoDetalle /> },
      { path: "/comunidades", element: <Comunidadeshome /> },
      { path: "/comunidades/:id", element: <ComunidadDetalle /> },
    ],
  },
  {
    path: "/dashboard",
    element: <RutaPrivada />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "perfil", element: <Perfil /> },
          {
            path: "mis-negocios",
            children: [
              { path: "", element: <MisNegocios /> },
              { path: "crear", element: <CrearNegocio /> },
              { path: ":id/editar", element: <EditarNegocio /> },
            ],
          },
          {
            path: "mis-eventos",
            children: [
              { path: "", element: <MisEventos /> },
              { path: "crear", element: <CrearEvento /> },
              { path: ":id/editar", element: <EditarEvento /> },
            ],
          },
          {
            path: "categorias",
            children: [
              { path: "", element: <Categorias /> },
              { path: "crear", element: <CrearCategoria /> },
              { path: ":id/editar", element: <EditarCategoria /> },
            ],
          },
          {
            path: "comunidades",
            children: [
              { path: "", element: <Comunidades /> },
              { path: "crear", element: <CrearComunidad /> },
              { path: ":id/editar", element: <EditarComunidad /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/registro", element: <Registro /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
