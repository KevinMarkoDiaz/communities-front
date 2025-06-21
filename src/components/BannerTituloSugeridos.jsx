import { Link } from "react-router-dom";
import BannerPromociones from "./promo/BannerPromociones";

export default function BannerTituloSugeridos({ titulo, imagen, link }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {imagen && <BannerPromociones titulo={titulo} imagen={imagen} />}

      <Link to={link} className="w-fit">
        <h2 className="text-xl md:text-xl font-bold text-black tracking-tight leading-snug">
          {titulo}
        </h2>
      </Link>
    </div>
  );
}
