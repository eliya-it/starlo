import React from "react";

const Item = ({ className, id, children }) => {
  return (
    <li className={`list__item ${className ? className : ""}`} key={id}>
      {children}
    </li>
  );
};

export default Item;
