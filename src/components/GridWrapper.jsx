import React, { forwardRef } from "react";

const GridWrapper = forwardRef(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-12 min-h-[70vh]"
    >
      {children}
    </div>
  );
});

export default GridWrapper;
