import React from "react";

const Grid = ({ col, className, children, isAuto }) => {
  return (
    <div
      className={`grid ${col ? `grid--col-${col}` : ""} ${className} ${
        isAuto && !col ? "grid--auto" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Grid;
