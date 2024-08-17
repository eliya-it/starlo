import React from "react";
import NavigationLink from "../../NavigationLink";
import { useSelector } from "react-redux";

const NavLinks = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ul className="navbar__list">
      <NavigationLink text="Home" path="/" />
      <NavigationLink text="About" path="/about" />
      <NavigationLink text="Rooms" path="/rooms?page=1" />
      {user?.token ? <NavigationLink text="Settings" path="/me" /> : null}
      {!user?.token ? <NavigationLink text="Login" path="/login" /> : null}
      {!user?.token ? <NavigationLink text="Signup" path="/signup" /> : null}
    </ul>
  );
};

export default NavLinks;
