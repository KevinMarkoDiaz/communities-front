import VistaPromosPorTipo from "./VistaPromosPorTipo";
import bnpf from "../../assets/bnpf.png";

export default function PromoFinDeSemana() {
  return (
    <VistaPromosPorTipo
      titulo="Promo fin de semana"
      descripcion="Descubrí las mejores promociones para este fin de semana."
      tipo="promo_fin_de_semana"
      imagenBanner={bnpf}
    />
  );
}
