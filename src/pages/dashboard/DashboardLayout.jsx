import { Outlet, NavLink } from "react-router-dom"

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-100 p-4 space-y-4">
        <h2 className="text-xl font-bold text-blue-700">Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="perfil" className="hover:underline">Mi perfil</NavLink>
          <NavLink to="mis-negocios" className="hover:underline">Mis negocios</NavLink>
          <NavLink to="mis-eventos" className="hover:underline">Mis eventos</NavLink>
        </nav>
      </aside>

      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  )
}
