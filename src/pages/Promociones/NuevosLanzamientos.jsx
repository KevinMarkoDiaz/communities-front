import VistaPromosPorTipo from "./VistaPromosPorTipo";
import bnnl from "../../assets/bnnl.png";

export default function NuevosLanzamientos() {
  return (
    <VistaPromosPorTipo
      titulo="Nuevos lanzamientos"
      descripcion="Descubrí los últimos lanzamientos pensados para vos."
      tipo="nuevos_lanzamientos"
      imagenBanner={bnnl}
    />
  );
}
