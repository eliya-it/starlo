import React from "react";

const List = ({ isCol, className, children }) => {
  return (
    <ul className={`list ${isCol ? "list--col" : " "} ${className}`}>
      {children}
    </ul>
  );
};

export default List;
