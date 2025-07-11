import React, { forwardRef } from "react";

const GridWrapper = forwardRef(
  ({ children, className = "", tipo = "grid" }, ref) => {
    const baseClass =
      tipo === "lista"
        ? "flex flex-col gap-4"
        : [
            "grid justify-center",
            // Por defecto (móvil): 2 columnas
            "grid-cols-2",
            // A partir de md: auto-fit con minmax
            "md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
            "gap-y-8 gap-x-4 xl:gap-x-22",
          ].join(" ");

    return (
      <div ref={ref} className={`${baseClass} ${className}`}>
        {children}
      </div>
    );
  }
);

export default GridWrapper;
