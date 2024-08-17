import React from "react";
import Section from "../Section/Section";
import Container from "../Containers/Container";
import Heading from "../Typography/Heading";
import { Link } from "react-router-dom";

const AuthMessage = ({ message }) => {
  return (
    <Section className="section--auth">
      <Container>
        <div className="auth-message u-center-text">
          <Heading isTertiary className="auth-message__heading ">
            {message}
          </Heading>
          <p className="auth-message__text">
            <span> Go back to home page from</span>
            <strong>
              <Link to="/" className="auth-message__link">
                Here
              </Link>
            </strong>
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default AuthMessage;
