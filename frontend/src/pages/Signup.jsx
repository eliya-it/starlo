import React, { useEffect } from "react";
import Section from "../components/Section/Section";
import Container from "../components/Containers/Container";
import SignupForm from "../components/SignupForm/SignupForm";
import PageTransition from "../components/Containers/PageTransition";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const Signup = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.token) navigate("/me");
  }, [user]);
  return (
    <PageTransition>
      <Section className="section--signup">
        {" "}
        {/* Extra Check */}
        {!user?.token ? (
          <Container>
            <div className="signup grid grid--col-2 grid--no-gap">
              <div className="signup__text">
                <h3 className="signup__heading">
                  Signup and get access to your room
                </h3>
                <SignupForm />
              </div>
              <div className="signup__info">
                <p className="signup__paragraph paragraph">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Totam debitis eveniet veritatis hic doloribus praesentium
                  itaque illum quod molestiae!
                </p>
                <p className="signup__author">Alex Mason</p>
              </div>
            </div>
          </Container>
        ) : (
          ""
        )}
      </Section>
    </PageTransition>
  );
};

export default Signup;
