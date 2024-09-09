import React from "react";
import hero from "../assets/img/hero.png";

import Photo from "./Photo/Photo";
import Animate from "./UI/Animate";
const Header = () => {
  return (
    <header className="header" id="header">
      <div className="header__text">
        <Animate>
          <h1 className="heading--primary">
            Starlo For All clients, devs and business owners
          </h1>
        </Animate>

        <Animate>
          <a
            className="btn btn--primary"
            href="https://github.com/eliya_it/starlo/backend#starlo"
            rel="noreferrer"
            target="_blank"
          >
            API documntation
          </a>
        </Animate>
      </div>
      <Animate visible={{ x: "0" }} className="header__img-box">
        <Photo className="header__img" src={hero} />
      </Animate>
    </header>
  );
};

export default Header;
