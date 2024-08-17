import React from "react";
import Section from "../Section/Section";
import Container from "../Containers/Container";
import Heading from "../Typography/Heading";
import { useSelector } from "react-redux";
import Button from "../UI/Button/Button";
import useHttp from "../../hooks/http";
import Message from "../UI/Message/Message";

const Booking = ({ roomID, name }) => {
  const { sendRequest, error, status, isLoading } = useHttp();
  const bookRoomHandler = (e, roomId) => {
    e.preventDefault();
    sendRequest(`/users/${roomId}/booking`, "POST", true);
  };
  const { user } = useSelector((state) => state.auth);
  console.log(error);
  return (
    <Section className="section--no-border">
      {" "}
      {error ? (
        <Message
          text="You have this room in your bookings already!"
          status="fail"
        />
      ) : null}
      {status ? <Message text="Room added to your bookings!" /> : null}
      <Container>
        <div className="book-room">
          <div className="book-room__text">
            <Heading
              className="book-room__heading u-left-text "
              isWhite
              isTertiary
            >{`Book ${name}`}</Heading>

            <p className="book-room__paragraph">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              mollitia magnam veniam quo voluptates molestiae architecto
              cupiditate laborum fugiat minus! Provident aut temporibus sequi
              dolorum aliquid sapiente veniam omnis corrupti maxime blanditiis.
            </p>
            {!user?.token ? (
              <Button className="btn btn--white" disabled={!user?.token}>
                Login to book it
              </Button>
            ) : user?.role === "admin" ? (
              <Button className="btn btn--white" disabled={true}>
                Admin Can't Book A Room!
              </Button>
            ) : (
              <Button
                className="btn btn--white"
                disabled={!user?.token}
                onClick={(e) => bookRoomHandler(e, roomID)}
              >
                Add
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Booking;
