import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/Home"
import Negocios from "../pages/Negocios"
import Eventos from "../pages/Eventos"
import Login from "../pages/Login"
import Registro from "../pages/Registro"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/negocios", element: <Negocios /> },
      { path: "/eventos", element: <Eventos /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/registro", element: <Registro /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
