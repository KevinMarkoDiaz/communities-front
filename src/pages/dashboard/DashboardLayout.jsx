import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/authSlice";
import Navbar from "../../components/Navbar";
import SidebarDashboard from "./SidebarDashboard";
import MobileFooterDashboard from "./MobileFooterDashboard";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.auth.usuario);

  const scrollRef = useRef(); // 👈 acá

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Layout principal */}
      <div className="flex flex-1">
        <div className="hidden md:block">
          <SidebarDashboard usuario={usuario} handleLogout={handleLogout} />
        </div>

        <main
          ref={scrollRef} // 👈 aquí
          className="flex-grow overflow-y-auto p-6 pb-24 md:pb-6"
        >
          <Outlet />
        </main>

        {/* El footer necesita saber dónde está el scroll */}
        <MobileFooterDashboard
          usuario={usuario}
          handleLogout={handleLogout}
          scrollContainerRef={scrollRef}
        />
      </div>
    </div>
  );
}
