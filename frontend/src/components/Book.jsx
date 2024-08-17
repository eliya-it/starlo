import React from "react";
import Heading from "./Typography/Heading";

import { FULL_PATH } from "../config";
import useHttp from "../hooks/http";
const Book = ({ name, price, photo, bookId, roomId, cb }) => {
  const { sendRequest, data, error, isLoading } = useHttp();
  return (
    <div className="book">
      <img
        src={`${FULL_PATH}/img/rooms/${photo}`}
        alt={`${name} photo on Starlo`}
        className="book__photo"
      />

      <div className="book__text">
        <Heading isTertiary>{`${name} room`} </Heading>
        <p className="book__price">{`${price}$`}</p>
        <button className="book__close" onClick={() => cb(roomId, bookId)}>
          <span className="book__icon">&nbsp;</span>
        </button>
      </div>
    </div>
  );
};

export default Book;
