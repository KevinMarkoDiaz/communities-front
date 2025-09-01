// src/router/AppRouter.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGate from "../components/AuthGate";
import PublicOnlyRoute from "../routes/PublicOnlyRoute";

import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Negocios from "../pages/Negocios";
import Eventos from "../pages/Eventos";
import Comunidadeshome from "../pages/Comunidades";
import ComunidadDetalle from "../pages/ComunidadDetalle";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import LegalPrivacidad from "../pages/LegalPrivacidad";
import LegalTerminos from "../pages/LegalTerminos";
import NotFound from "../pages/NotFound";

import Login from "../pages/Login";
import RegistroMultiStep from "../pages/Registro";
import VerificaTuCorreo from "../pages/VerificaTuCorreo";

import NegocioDetalle from "../pages/NegocioDetalle";
import EventoDetalle from "../pages/EventoDetalle";

import Promociones from "../pages/Promociones/Promociones";

import PremiumInfo from "../pages/premium/PremiumInfo";
import SuscripcionExitosa from "../pages/premium/SuscripcionExitosa";
import SuscripcionCancelada from "../pages/premium/SuscripcionCancelada";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Perfil from "../pages/dashboard/Perfil";
import EditarPerfil from "../pages/dashboard/EditarPerfil";
import Notificaciones from "../pages/dashboard/Notificaciones";

import MisNegocios from "../pages/dashboard/MisNegocios";
import CrearNegocio from "../pages/dashboard/CrearNegocio";
import PromosPorNegocio from "../pages/dashboard/PromosPorNegocio";
import MisPromos from "../pages/dashboard/misPromos";
import CrearPromo from "../pages/dashboard/CrearPromo";

import MisEventos from "../pages/dashboard/MisEventos";
import CrearEvento from "../pages/dashboard/CrearEvento";
import EditarEvento from "../pages/dashboard/EditarEvento";

import Categorias from "../pages/dashboard/Categorias";
import CrearCategoriaView from "../pages/dashboard/CrearCategoriaView";
import EditarCategoriaView from "../pages/dashboard/EditarCategoriaView";

import Comunidades from "../pages/dashboard/Comunidades";
import CrearComunidad from "../pages/dashboard/CrearComunidad";
import EditarComunidad from "../pages/dashboard/EditarComunidad";

import RutaPrivada from "../components/RutaPrivada";
import RutaPrivadaAdmin from "../components/RutaPrivadaAdmin";

// Mensajería
import InboxList from "../components/mensajes/InboxList";
import ChatView from "../components/mensajes/ChatView";

// NUEVAS vistas detalle
import DashboardBusinessDetail from "../pages/dashboard/vista_detalle/DashboardBusinessDetail";
import DashboardEventDetail from "../pages/dashboard/vista_detalle/DashboardEventDetail";
import DashboardCommunityDetail from "../pages/dashboard/vista_detalle/DashboardCommunityDetail";
import Cupones from "../pages/dashboard/Cupones";
import RedimirCodigo from "../pages/dashboard/RedimirCodigo";
import Banners from "../pages/dashboard/banners/Banners";
import CrearBannerView from "../pages/dashboard/banners/CrearBannerView";
import MisBanners from "../pages/dashboard/banners/MisBanners";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGate>
        <Layout />
      </AuthGate>
    ),
    children: [
      { path: "/", element: <Home /> },

      // Negocios públicos
      { path: "/negocios", element: <Negocios /> },
      { path: "/negocios/:id", element: <NegocioDetalle /> },

      // Eventos públicos
      { path: "/eventos", element: <Eventos /> },
      { path: "/eventos/:id", element: <EventoDetalle /> },

      // Comunidades públicas
      { path: "/comunidades", element: <Comunidadeshome /> },
      { path: "/comunidades/:id", element: <ComunidadDetalle /> },

      // Promociones
      {
        path: "/promociones",
        children: [{ path: "", element: <Promociones /> }],
      },

      // Páginas informativas
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/legal-privacy", element: <LegalPrivacidad /> },
      { path: "/legal-terms", element: <LegalTerminos /> },

      // Premium
      { path: "/premium", element: <PremiumInfo /> },
      { path: "/suscripcion-exitosa", element: <SuscripcionExitosa /> },
      { path: "/suscripcion-cancelada", element: <SuscripcionCancelada /> },
    ],
  },

  // Autenticación (público-exclusivo)
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/registro",
    element: (
      <PublicOnlyRoute>
        <RegistroMultiStep />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/verifica-tu-correo",
    element: (
      <PublicOnlyRoute>
        <VerificaTuCorreo />
      </PublicOnlyRoute>
    ),
  },

  // Admin
  {
    path: "/dashboard-admin",
    element: <RutaPrivadaAdmin />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "mis-categorias",
            children: [
              { path: "", element: <Categorias /> },
              { path: "crear", element: <CrearCategoriaView /> },
              { path: ":id/editar", element: <EditarCategoriaView /> },
            ],
          },
          {
            path: "mis-comunidades",
            children: [
              { path: "", element: <Comunidades /> },
              { path: "crear", element: <CrearComunidad /> },
              { path: ":id/editar", element: <EditarComunidad /> },
              { path: ":id", element: <DashboardCommunityDetail /> },
            ],
          },
          {
            path: "banners",
            children: [
              { path: "", element: <Banners /> },
              { path: "crear", element: <CrearBannerView /> },
            ],
          },
        ],
      },
    ],
  },

  // Dashboard privado
  {
    path: "/dashboard",
    element: <RutaPrivada />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          // Mensajería
          {
            path: "inbox",
            children: [
              { path: "", element: <InboxList /> },
              { path: "conversation/:id", element: <ChatView /> },
            ],
          },

          { path: "perfil", element: <Perfil /> },
          { path: "perfil/editar", element: <EditarPerfil /> },
          { path: "notificaciones", element: <Notificaciones /> },
          { path: "cupones", element: <Cupones /> },
          { path: "redimir", element: <RedimirCodigo /> },

          // Negocios del usuario
          {
            path: "mis-negocios",
            children: [
              { path: "", element: <MisNegocios /> },
              { path: "crear", element: <CrearNegocio /> },
              { path: ":id", element: <DashboardBusinessDetail /> },
              { path: ":id/editar", element: <CrearNegocio /> },
              { path: ":id/promos", element: <PromosPorNegocio /> },
              { path: ":negocioId/promos/nueva", element: <CrearPromo /> },
            ],
          },

          // Banners
          {
            path: "mis-banners",
            children: [
              { path: "", element: <MisBanners /> },
              { path: "crear", element: <CrearBannerView /> },
            ],
          },

          // Eventos del usuario
          {
            path: "mis-eventos",
            children: [
              { path: "", element: <MisEventos /> },
              { path: "crear", element: <CrearEvento /> },
              { path: ":id", element: <DashboardEventDetail /> },
              { path: ":id/editar", element: <EditarEvento /> },
            ],
          },

          // Promos
          {
            path: "mis-promos",
            children: [
              { path: "", element: <MisPromos /> },
              { path: ":promoId/editar", element: <CrearPromo /> },
            ],
          },

          // Categorías
          {
            path: "categorias",
            children: [{ path: "", element: <Categorias /> }],
          },

          // Comunidades del usuario
          {
            path: "comunidades",
            children: [{ path: "", element: <Comunidades /> }],
          },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
