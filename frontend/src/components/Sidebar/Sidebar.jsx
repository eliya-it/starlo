import React, { useState } from "react";
import List from "../List/List";
import {
  LiaBedSolid,
  LiaClipboardListSolid,
  LiaUserCogSolid,
} from "react-icons/lia";
import useLogout from "../../hooks/useLogout";
import SidebarLink from "./SidebarLink/SidebarLink";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="sidebar">
      <h3 className="sidebar__heading">
        Welcome back <br />{" "}
        <span className="sidebar__heading__name">{user?.name}</span>
      </h3>
      <List className="sidebar__list" isCol>
        <SidebarLink path="/me">
          <LiaUserCogSolid className="sidebar__icon" />
          <span>Settings</span>
        </SidebarLink>{" "}
        <SidebarLink path="/add-room">
          <LiaBedSolid className="sidebar__icon" />
          <span>Add Room</span>
        </SidebarLink>{" "}
        <SidebarLink path="/bookings">
          <LiaClipboardListSolid className="sidebar__icon" />
          <span>Bookings</span>
        </SidebarLink>{" "}
      </List>
      <button className="sidebar__logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
