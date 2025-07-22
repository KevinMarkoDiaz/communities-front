import { Outlet } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import SidebarDashboard from "./SidebarDashboard";
import MobileFooterDashboard from "./MobileFooterDashboard";
import useLogout from "../../hooks/useLogout";

export default function DashboardLayout() {
  const usuario = useSelector((state) => state.auth.usuario);

  const scrollRef = useRef(); // 👈 acá
  const handleLogout = useLogout();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Layout principal */}
      <div className="flex flex-1">
        <div className=" hidden md:block">
          <SidebarDashboard usuario={usuario} handleLogout={handleLogout} />
        </div>

        <main className="flex-grow pt-4 overflow-y-auto p-4 lg:p-6 pb-24 md:pb-6">
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
