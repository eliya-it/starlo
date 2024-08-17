import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
const Slider = ({ children, sliderID, index }) => {
  const goToSlide = function (slide) {
    const slides = document.querySelectorAll(".slider__slide");
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  useEffect(() => {
    goToSlide(index);
  }, [index]);
  return (
    /*
     * I'm setting key on slider container,
     *  because if I want to add another slider than react will differentiate between sliders
     */
    <div className="slider" key={uuid()}>
      {children}
    </div>
  );
};

export default Slider;
