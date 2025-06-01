import { Link } from "react-router-dom";

export const PerfilBtn = ({ usuario }) => (
  <Link
    to={usuario ? "/dashboard/perfil" : "/login"}
    className="flex items-center justify-center h-9 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-xl hover:bg-[#e7b93e] transition"
  >
    {usuario ? "Perfil" : "Entrar"}
  </Link>
);
