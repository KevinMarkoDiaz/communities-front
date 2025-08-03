import React, { forwardRef } from "react";

const GridWrapper = forwardRef(
  ({ children, className = "", tipo = "grid" }, ref) => {
    const baseClass =
      tipo === "lista"
        ? "flex flex-col gap-4"
        : [
            "grid",
            "items-start", // alinea contenido arriba
            "grid-cols-2",
            "md:grid-cols-3",
            "xl:grid-cols-4",
            "gap-y-8 gap-x-4 xl:gap-x-6",
            "w-full", // ocupa ancho completo
            "max-h-fit", // 👈 esto es lo que buscás
          ].join(" ");

    return (
      <div ref={ref} className={`${baseClass} ${className}`}>
        {children}
      </div>
    );
  }
);

export default GridWrapper;
