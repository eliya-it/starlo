import React, { useEffect, useState } from "react";

import Container from "../components/Containers/Container";
import Section from "../components/Section/Section";
import LoginForm from "../components/LoginForm";
import PageTransition from "../components/Containers/PageTransition";
import { useSelector } from "react-redux";
import Heading from "../components/Typography/Heading";
import { useNavigate } from "react-router";
const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.token) navigate("/me");
  }, [user]);
  return (
    <PageTransition>
      <Section className="section--login section--full">
        {/* Extra Check */}
        {!user?.token ? (
          <Container>
            <div className="login grid grid--col-2 ">
              <div className="login__text">
                <h3 className="login__heading">
                  login and get access to your room
                </h3>
                <LoginForm />
              </div>
              <div className="login__info">
                <p className="login__paragraph paragraph">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Totam debitis eveniet veritatis hic doloribus praesentium
                  itaque illum quod molestiae!
                </p>
              </div>
            </div>{" "}
          </Container>
        ) : (
          ""
        )}
      </Section>
    </PageTransition>
  );
};
export default Login;
