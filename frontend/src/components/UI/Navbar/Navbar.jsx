import React from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import NavUser from "./NavUser";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Logo />

        <MobileNav />
        <NavLinks />
        <NavUser />
      </nav>
    </>
  );
};

export default Navbar;
