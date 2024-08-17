import React from "react";

const Link = ({ path, className, text, children }) => {
  return (
    <a href={path} className={`link ${className}`}>
      {text || children}
    </a>
  );
};

export default Link;
