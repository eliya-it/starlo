import React from "react";

const GalleryPhoto = ({ className, path }) => {
  return (
    <figure className={className}>
      <img className="gallery__img" src={path} alt="Gallery photo" />
    </figure>
  );
};

export default GalleryPhoto;
