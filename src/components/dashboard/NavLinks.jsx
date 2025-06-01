import { Link } from "react-router-dom";

export const NavLinks = () => (
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
);
