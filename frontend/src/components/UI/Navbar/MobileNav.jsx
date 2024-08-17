import React from "react";

const MobileNav = () => {
  return (
    <>
      <input
        className="navbar__checkbox"
        id="mobile-nav"
        type="checkbox"
        name="mobile-nav"
      />
      <label className="navbar__btn" htmlFor="mobile-nav">
        <span className="navbar__icon"> </span>
      </label>
    </>
  );
};

export default MobileNav;
