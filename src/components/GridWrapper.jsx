import React, { forwardRef } from "react";

const GridWrapper = forwardRef(
  ({ children, className = "", tipo = "grid" }, ref) => {
    const baseClass =
      tipo === "lista"
        ? "flex flex-col gap-4"
        : [
            "grid justify-center",
            "grid-cols-2", // mobile
            "md:grid-cols-3", // md y lg
            "xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]", // xl+: dinámico
            "gap-y-8 gap-x-4 xl:gap-x-6",
          ].join(" ");

    return (
      <div ref={ref} className={`${baseClass} ${className}`}>
        {children}
      </div>
    );
  }
);

export default GridWrapper;
