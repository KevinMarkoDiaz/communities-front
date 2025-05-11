import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/Home"
import Negocios from "../pages/Negocios"
import Eventos from "../pages/Eventos"
import Login from "../pages/Login"
import Registro from "../pages/Registro"
import NegocioDetalle from "../pages/NegocioDetalle"

import DashboardLayout from "../pages/dashboard/DashboardLayout"
import Perfil from "../pages/dashboard/Perfil"
import MisNegocios from "../pages/dashboard/MisNegocios"
import MisEventos from "../pages/dashboard/MisEventos"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/negocios", element: <Negocios /> },
      { path: "/negocios/:id", element: <NegocioDetalle /> },
      { path: "/eventos", element: <Eventos /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "perfil", element: <Perfil /> },
      { path: "mis-negocios", element: <MisNegocios /> },
      { path: "mis-eventos", element: <MisEventos /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/registro", element: <Registro /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
