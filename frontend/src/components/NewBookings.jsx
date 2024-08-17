import React from "react";
import Order from "./Book";
import Heading from "./Typography/Heading";

const NewBookings = ({ books, deleteHandler }) => {
  if (books?.length === 0) {
    return (
      <Heading isTertiary className="u-margin-top-big">
        There are no bookings at the moment
      </Heading>
    );
  } else
    return (
      <div className="u-flex u-flex--col">
        {books?.map((order) => (
          <Order
            key={order._id}
            name={order.room.name}
            price={order.room.price}
            photo={order.room.cover}
            cb={deleteHandler}
            bookId={order._id}
            roomId={order.room._id}
          />
        ))}
      </div>
    );
};

export default NewBookings;
