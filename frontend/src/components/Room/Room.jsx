import React from "react";
import List from "../List/List";
import Item from "../List/Item/Item";
import {
  LiaBedSolid,
  LiaCalendar,
  LiaInfoSolid,
  LiaNutritionix,
  LiaPlusSolid,
  LiaWifiSolid,
} from "react-icons/lia";
import { Link } from "react-router-dom";
import { FULL_PATH } from "../../config";
const Room = ({
  room: {
    cover,
    name,
    slug,
    bedsCount,
    extraBeds,
    meals,
    createdAt,
    isOccupied,
    ratingsAverage,
    price,
  },
}) => {
  return (
    <div className="rooms__room rooms__room--single">
      <img
        src={`${FULL_PATH}/img/rooms/${cover}`}
        alt=""
        className="rooms__room__img"
      />
      <div className="rooms__room__text">
        <div className="rooms__room__background">
          <h4 className="rooms__room__heading">{name}</h4>
        </div>
        <div className="rooms__room__price">
          <span>{`${price}$`}</span>
        </div>
        <List className="rooms__room__list">
          <Item>
            <LiaBedSolid className="icon" />
            <span>{bedsCount} beds</span>
          </Item>{" "}
          <Item>
            <LiaPlusSolid className="icon" />
            <span>
              {`${extraBeds} extra ${extraBeds > 1 ? "beds" : "bed"}`}
            </span>
          </Item>
          <Item>
            <LiaNutritionix className="icon" />
            <span>{meals} meals</span>
          </Item>{" "}
          <Item>
            <LiaInfoSolid className="icon" />
            <span>{isOccupied ? "Occupied" : "available"}</span>
          </Item>{" "}
          <Item>
            <LiaCalendar className="icon" />
            <span>
              {new Date(createdAt).toLocaleString("en-us", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </span>
          </Item>{" "}
          <Item>
            <LiaWifiSolid className="icon" />
            <span>Free wifi</span>
          </Item>
        </List>
        <div className="u-flex">
          <p className="rooms__room__rating">{ratingsAverage}</p>
          <Link className="btn btn--white" to={`/room/${slug}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;
