import React from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Reveal from "../../Animations/Reveal";
import Section from "../Section/Section";
import Container from "../Containers/Container";
import Heading from "../Typography/Heading";
import Form from "../UI/Form/Form";
import Animate from "../UI/Animate";
const Booking = () => {
  return (
    <Section className=" section--6">
      <Heading className="color--white" isSecondary>
        Start your holiday with us
      </Heading>
      <Container>
        <div className="booking grid grid--col-2  ">
          <div className="booking__text-box color--white">
            <Animate
              hidden={{
                translateY: "20rem",
                opacity: 0,
              }}
              visible={{
                translateY: "0",
                opacity: 1,
              }}
              className="booking__text"
            >
              <Heading isTertiary>Find a room that is good for you</Heading>
              <p className="paragraph u-margin-bottom-small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                culpa corporis, voluptatibus voluptas odio incidunt.
                Reprehenderit tempora expedita, consectetur, fugiat quo sequi
                accusamus quis non fuga fugit pariatur cupiditate? Esse!
              </p>
            </Animate>
            <Animate
              className="booking__text"
              hidden={{
                translateY: "20rem",
                opacity: 0,
              }}
              visible={{
                translateY: "0",
                opacity: 1,
              }}
            >
              <Heading isTertiary>Meetings room are avilable</Heading>

              <p className="paragraph u-margin-bottom-small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                culpa corporis, voluptatibus voluptas odio incidunt.
                Reprehenderit
              </p>
            </Animate>
          </div>
          <Form className="form form--col" action="#">
            <Input label="full name" placeholder="John Doe" min={4} isLight />
            <Input
              type="email"
              label="Your email"
              placeholder="user@starlo.com"
              isLight
            />
            <Button className="btn btn--white">Register</Button>
          </Form>
        </div>
      </Container>
    </Section>
  );
};

export default Booking;
