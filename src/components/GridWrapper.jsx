import React, { forwardRef } from "react";

const GridWrapper = forwardRef(({ children, className = "" }, ref) => {
  return (
    <div
      ref={ref}
      className={`grid justify-center  grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 ${className}`}
    >
      {children}
    </div>
  );
});

export default GridWrapper;
