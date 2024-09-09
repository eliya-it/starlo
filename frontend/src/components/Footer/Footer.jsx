import React from "react";
import Item from "../List/Item/Item";
import List from "../List/List";
import { LiaFacebook, LiaInstagram, LiaTwitch } from "react-icons/lia";
import Container from "../Containers/Container";
import logo from "../../assets/img/logo.png";

const Footer = (props) => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__logo">
          <img className="footer__logo" src={logo} />
        </div>
        <div className="footer__links">
          <List className="footer__list">
            <Item className="footer__item">
              <a className="footer__link" href="#">
                Home
              </a>
            </Item>
            <Item className="footer__item">
              <a className="footer__link" href="#">
                Pricing
              </a>
            </Item>
            <Item className="footer__item">
              <a className="footer__link" href="#">
                Service
              </a>
            </Item>
            <Item className="footer__item">
              <a className="footer__link" href="#">
                About{" "}
              </a>
            </Item>
          </List>
          <div className="footer__icons">
            <List className="footer__social">
              <Item className="footer__item">
                <a href="#">
                  <LiaTwitch className="footer__icon" />
                </a>
              </Item>

              <Item className="footer__item">
                <a href="#">
                  <LiaFacebook className="footer__icon" />
                </a>
              </Item>

              <Item className="footer__item">
                <a href="#">
                  <LiaInstagram className="footer__icon" />
                </a>
              </Item>
              <Item className="footer__item">
                <a href="#">
                  <svg className="footer__icon footer__icon--linkedin">
                    <use href="img/sprite.svg#icon-linkedin"></use>
                  </svg>
                </a>
              </Item>
            </List>
          </div>
        </div>
        <p className="footer__copyright">
          This project was developed by
          <a
            className=""
            href="https://x.com/eliya_it"
            target="_blank"
            rel="noreferrer"
          >
            <strong> Eliya </strong>
          </a>
          as part of his portfolio. <br />
          &copy; All rights reserved.
        </p>
      </Container>
    </footer>
  );
};
export default Footer;
