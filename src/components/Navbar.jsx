import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex gap-4">
      <Link to="/" className="text-blue-600 font-bold">Communities</Link>
      <Link to="/negocios">Negocios</Link>
      <Link to="/eventos">Eventos</Link>
    </nav>
  )
}
