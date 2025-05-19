import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen gap-16">
      <Navbar />

      <main className="flex flex-grow overflow-hidden">
        <div className="w-full max-w-[95%] lg:max-w-[80%] mx-auto flex flex-col gap-20">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
