import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-grow">
        {/* Sidebar izquierda */}
        <aside className="hidden lg:block w-72 p-4 border-r border-gray-200 bg-[#F8F9FB]"></aside>

        {/* Contenido principal */}
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
