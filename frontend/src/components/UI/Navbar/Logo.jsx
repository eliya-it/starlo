import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";

const Logo = () => {
  return (
    <div className="navbar__logo-box">
      <Link to="/">
        <img className="navbar__logo" src={logo} alt="Starlo logo" />
      </Link>
    </div>
  );
};

export default Logo;
