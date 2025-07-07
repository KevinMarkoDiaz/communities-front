import React, { forwardRef } from "react";

const GridWrapper = forwardRef(
  ({ children, className = "", tipo = "grid" }, ref) => {
    const baseClass =
      tipo === "lista"
        ? "flex flex-col gap-4"
        : "grid justify-center grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-y-8 gap-x-8 xl:gap-x-22";

    return (
      <div ref={ref} className={`${baseClass} ${className}`}>
        {children}
      </div>
    );
  }
);

export default GridWrapper;
