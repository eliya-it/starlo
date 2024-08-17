import React from "react";
import { v4 as uuid } from "uuid";

const Slide = ({ children }) => {
  return (
    <div className="slider__slide" key={uuid()}>
      {children}
    </div>
  );
};

export default Slide;
