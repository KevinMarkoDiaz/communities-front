import React, { forwardRef } from "react";

const GridWrapper = forwardRef(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
    >
      {children}
    </div>
  );
});

export default GridWrapper;
