import React from "react";
import LazyLoadImage from "./LazyLoadImage";
const Photo = ({ src, lazySrc, className }) => {
  return (
    <LazyLoadImage
      src={src}
      lazySrc={lazySrc}
      alt="Starlo header photo"
      className={className}
    />
  );
};

export default Photo;
