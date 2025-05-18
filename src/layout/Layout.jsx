import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex flex-grow overflow-hidden">
        <div className="flex-grow p-4">
          <div className="w-full max-w-[95%] lg:max-w-[80%] xl:max-w-[70%] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
