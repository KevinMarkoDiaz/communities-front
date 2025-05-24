import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useNegocios } from "../../hooks/useNegocios";
import hb from "../../assets/hb.png"; // asegúrate que exista esa imagen
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function NegociosSugeridos() {
  const { lista: negocios } = useNegocios();

  return (
    <section className="space-y-16">
      <BannerTituloSugeridos
        titulo="Destacados de tu comunidad"
        imagen={hb}
        link="/negocios"
      />

      <GridWrapper>
        {negocios.slice(0, 4).map((negocio) => (
          <Link
            to={`/negocios/${negocio.id || negocio._id}`}
            key={negocio.id || negocio._id}
            className="flex-shrink-0"
          >
            <Card
              title={negocio.nombre}
              description={negocio.descripcion}
              image={negocio.imagenDestacada}
              isNew={negocio.isNew}
              hasDiscount={negocio.hasDiscount}
              isVerified={negocio.verificado}
            />
          </Link>
        ))}
      </GridWrapper>
    </section>
  );
}
