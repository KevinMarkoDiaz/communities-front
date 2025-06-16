import { Outlet, NavLink, Link, useNavigate } from "react-router-dom"; // <-- importá useNavigate
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../assets/logo.png";
import { logout } from "../../store/authSlice";
import Navbar from "../../components/Navbar";
import SidebarDashboard from "./SidebarDashboard";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- hook para navegar
  const usuario = useSelector((state) => state.auth.usuario);
  const [showSticky, setShowSticky] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // <-- Usá la función navigate para redirigir
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white border-b border-[#E4E9F1] shadow-sm transition-all duration-300 transform ${
          showSticky
            ? "translate-y-0 opacity-100 z-50"
            : "-translate-y-full opacity-0 z-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-base font-bold">
              <img src={Icon} alt="logo" className="h-10" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/negocios" className="hover:text-[#FB8500]">
                Business
              </Link>
              <Link to="/eventos" className="hover:text-[#FB8500]">
                Events
              </Link>
              <Link to="/comunidades" className="hover:text-[#FB8500]">
                Communities
              </Link>
              <Link to="/promociones" className="hover:text-[#FB8500]">
                Promos
              </Link>
            </nav>
            <Link
              to={usuario ? "/dashboard/perfil" : "/login"}
              className="flex items-center justify-center h-9 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-xl hover:bg-[#e7b93e] transition"
            >
              {usuario ? "Perfil" : "Entrar"}
            </Link>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-1">
        <SidebarDashboard usuario={usuario} handleLogout={handleLogout} />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
