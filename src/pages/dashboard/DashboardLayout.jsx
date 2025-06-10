import { Outlet, NavLink, Link, useNavigate } from "react-router-dom"; // <-- importá useNavigate
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../assets/logo.png";
import HeaderDashboard from "../../components/dashboard/HeaderDashboard";
import { logout } from "../../store/authSlice";

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
      <HeaderDashboard usuario={usuario} />

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
        <aside className="w-64 md:w-72 lg:w-80 px-4 py-5 bg-[#F8F9FB] flex-shrink-0">
          <div className="flex flex-col h-full min-h-[700px] bg-[#F8F9FB] p-4">
            {/* Encabezado y navegación */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col">
                <h1 className="text-[#141C24] text-base font-medium leading-normal">
                  Dashboard
                </h1>
                <p className="text-[#3F5374] text-sm font-normal leading-normal">
                  {usuario?.name} • {usuario?.title || "Usuario"}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <NavLink
                  to="perfil"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-full ${
                      isActive ? "bg-[#E4E9F1]" : ""
                    }`
                  }
                >
                  <p className="text-[#141C24] text-sm font-medium leading-normal">
                    Mi perfil
                  </p>
                </NavLink>

                <NavLink
                  to="mis-negocios"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-full ${
                      isActive ? "bg-[#E4E9F1]" : ""
                    }`
                  }
                >
                  <p className="text-[#141C24] text-sm font-medium leading-normal">
                    Mis negocios
                  </p>
                </NavLink>

                <NavLink
                  to="mis-eventos"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-full ${
                      isActive ? "bg-[#E4E9F1]" : ""
                    }`
                  }
                >
                  <p className="text-[#141C24] text-sm font-medium leading-normal">
                    Mis eventos
                  </p>
                </NavLink>

                <NavLink
                  to="comunidades"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-full ${
                      isActive ? "bg-[#E4E9F1]" : ""
                    }`
                  }
                >
                  <p className="text-[#141C24] text-sm font-medium leading-normal">
                    Mis comunidades
                  </p>
                </NavLink>

                <NavLink
                  to="mis-promos"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-full ${
                      isActive ? "bg-[#E4E9F1]" : ""
                    }`
                  }
                >
                  <p className="text-[#141C24] text-sm font-medium leading-normal">
                    Mis promos
                  </p>
                </NavLink>

                {usuario?.role === "admin" && (
                  <NavLink
                    to="categorias"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-full ${
                        isActive ? "bg-[#E4E9F1]" : ""
                      }`
                    }
                  >
                    <p className="text-[#141C24] text-sm font-medium leading-normal">
                      Mis categorías
                    </p>
                  </NavLink>
                )}

                {/* 💎 Botón Premium */}
                <NavLink
                  to="/premium"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-full ${
                      isActive ? "bg-[#F3E8FF]" : ""
                    }`
                  }
                >
                  <p className="text-[#7C3AED] text-sm font-medium leading-normal">
                    💎 Hazte Premium
                  </p>
                </NavLink>
              </div>
            </div>

            {/* Cerrar sesión */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-200 rounded"
            >
              <p className="text-[#141C24] text-sm font-medium leading-normal">
                Cerrar sesión
              </p>
            </button>
          </div>
        </aside>

        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
