import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavigationLink = ({ text, path }) => {
  return (
    <li className="navbar__item" key={path}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `navbar__link ${isActive ? "navbar__link--active" : ""}`
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default NavigationLink;
