import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ children, path }) => {
  const toggleActiveLinks = (activeStatus) => {
    if (activeStatus) {
      return "sidebar__link sidebar__link--active";
    } else return "sidebar__link";
  };
  return (
    <li className="sidebar__item  u-list__item u-list__item--active">
      <NavLink
        to={path}
        className={({ isActive }) => toggleActiveLinks(isActive)}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default SidebarLink;
