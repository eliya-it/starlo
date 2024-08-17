import React from "react";

const Section = ({ className, children, id, isReset }) => {
  return (
    <section
      className={`section ${!isReset && className ? className : ""}`}
      id={`${id ? id : ""}`}
    >
      {children}
    </section>
  );
};

export default Section;
