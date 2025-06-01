import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Negocios from "../pages/Negocios";
import Eventos from "../pages/Eventos";
import Comunidadeshome from "../pages/Comunidades";
import ComunidadDetalle from "../pages/ComunidadDetalle";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import NegocioDetalle from "../pages/NegocioDetalle";
import EventoDetalle from "../pages/EventoDetalle";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Perfil from "../pages/dashboard/Perfil";
import MisNegocios from "../pages/dashboard/MisNegocios";
import MisEventos from "../pages/dashboard/MisEventos";
import CrearEvento from "../pages/dashboard/CrearEvento";
import EditarEvento from "../pages/dashboard/EditarEvento";
import Categorias from "../pages/dashboard/Categorias";
import Comunidades from "../pages/dashboard/Comunidades";
import CrearComunidad from "../pages/dashboard/CrearComunidad";
import EditarComunidad from "../pages/dashboard/EditarComunidad";

import RutaPrivada from "../components/RutaPrivada";

import Promociones from "../pages/Promociones/Promociones";
import PromoFinDeSemana from "../pages/Promociones/PromoFinDeSemana";
import DescuentosImperdibles from "../pages/Promociones/DescuentosImperdibles";
import NuevosLanzamientos from "../pages/Promociones/NuevosLanzamientos";
import EditarPerfil from "../pages/dashboard/EditarPerfil";
import NegocioForm from "../pages/dashboard/NegocioForm";
import CrearCategoriaView from "../pages/dashboard/CrearCategoriaView";
import EditarCategoriaView from "../pages/dashboard/EditarCategoriaView";

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
      { path: "/comunidades", element: <Comunidadeshome /> },
      { path: "/comunidades/:id", element: <ComunidadDetalle /> },

      {
        path: "/promociones",
        children: [
          { path: "", element: <Promociones /> },
          { path: "promo-fin-de-semana", element: <PromoFinDeSemana /> },
          {
            path: "descuentos-imperdibles",
            element: <DescuentosImperdibles />,
          },
          { path: "nuevos-lanzamientos", element: <NuevosLanzamientos /> },
        ],
      },
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
          { path: "perfil/editar", element: <EditarPerfil /> },
          {
            path: "mis-negocios",
            children: [
              { path: "", element: <MisNegocios /> },
              { path: "crear", element: <NegocioForm /> },
              { path: ":id/editar", element: <NegocioForm /> },
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
              { path: "crear", element: <CrearCategoriaView /> },
              { path: ":id/editar", element: <EditarCategoriaView /> },
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

  // Ruta 404 (opcional)
  {
    path: "*",
    element: <div className="p-10 text-center">404 - Página no encontrada</div>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
