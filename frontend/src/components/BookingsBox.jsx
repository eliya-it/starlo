import React from "react";
import Heading from "./Typography/Heading";
import Item from "./List/Item/Item";
import List from "./List/List";

const BookingBox = ({ booking, totalPrice }) => {
  return (
    <div className="booking-box">
      <Heading className="booking-box__heading u-center-text" isTertiary>
        Your booking:
      </Heading>
      <p className="paragraph u-center-text">
        <strong>Total booking:</strong> <span>{booking?.length}</span>
      </p>
      <List isCol>
        {booking?.map((book) => (
          <Item className="booking-box__item">
            <strong>{book.room.name}:</strong>{" "}
            <span>{`${book.room.price}$`}</span>
          </Item>
        ))}
      </List>
      <p className="booking-box__total">{totalPrice}$</p>
    </div>
  );
};

export default BookingBox;
