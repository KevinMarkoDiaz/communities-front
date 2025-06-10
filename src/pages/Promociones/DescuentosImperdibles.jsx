import VistaPromosPorTipo from "./VistaPromosPorTipo";
import bndc from "../../assets/bndc.png";

export default function DescuentosImperdibles() {
  return (
    <VistaPromosPorTipo
      titulo="Descuentos imperdibles"
      descripcion="Descubrí promociones con descuentos exclusivos para tu comunidad."
      tipo="descuentos_imperdibles"
      imagenBanner={bndc}
    />
  );
}
