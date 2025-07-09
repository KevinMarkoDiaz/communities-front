import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Negocios from "../pages/Negocios";
import Eventos from "../pages/Eventos";
import Comunidadeshome from "../pages/Comunidades";
import ComunidadDetalle from "../pages/ComunidadDetalle";
import AboutUs from "../pages/AboutUs";

import Login from "../pages/Login";
import NegocioDetalle from "../pages/NegocioDetalle";
import EventoDetalle from "../pages/EventoDetalle";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Perfil from "../pages/dashboard/Perfil";
import MisNegocios from "../pages/dashboard/MisNegocios";
import MisEventos from "../pages/dashboard/MisEventos";
import CrearEvento from "../pages/dashboard/CrearEvento";
import CrearPromo from "../pages/dashboard/CrearPromo";

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

import PremiumInfo from "../pages/premium/PremiumInfo";
import SuscripcionExitosa from "../pages/premium/SuscripcionExitosa";
import SuscripcionCancelada from "../pages/premium/SuscripcionCancelada";
import PromosPorNegocio from "../pages/dashboard/PromosPorNegocio";
import MisPromos from "../pages/dashboard/misPromos";
import Contact from "../pages/Contact";
import LegalPrivacidad from "../pages/LegalPrivacidad";
import LegalTerminos from "../pages/LegalTerminos";
import NotFound from "../pages/NotFound";
import RegistroMultiStep from "../pages/Registro";
import CrearNegocio from "../pages/dashboard/CrearNegocio";

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
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/legal-privacy", element: <LegalPrivacidad /> },
      { path: "/legal-terms", element: <LegalTerminos /> },
      // 🟨 Rutas Premium
      { path: "/premium", element: <PremiumInfo /> },
      { path: "/suscripcion-exitosa", element: <SuscripcionExitosa /> },
      { path: "/suscripcion-cancelada", element: <SuscripcionCancelada /> },

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
              { path: "crear", element: <CrearNegocio /> },
              { path: ":id/editar", element: <CrearNegocio /> },
              { path: ":id/promos", element: <PromosPorNegocio /> },
              { path: ":negocioId/promos/nueva", element: <CrearPromo /> },
            ],
          },
          {
            path: "promociones/:promoId/editar",
            element: <CrearPromo />,
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
            path: "mis-promos",
            children: [{ path: "", element: <MisPromos /> }],
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
  { path: "/registro", element: <RegistroMultiStep /> },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
