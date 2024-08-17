import React from "react";

import { v4 as uuid } from "uuid";
import { FULL_PATH } from "../../config";
import { LiaStarSolid } from "react-icons/lia";
const Review = ({ name, photo, review, id, rating }) => {
  return (
    <div className="reviews__review">
      <img
        src={`${FULL_PATH}/img/users/${photo}`}
        alt=""
        className="reviews__review__photo"
      />

      <div className="reviews__review__container">
        <p className="reviews__review__name">{name}</p>
        <p className="reviews__review__text">{review}</p>
      </div>
      <div className="reviews__review__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <LiaStarSolid
            key={uuid()}
            className={`reviews__review__stars__star ${
              star <= rating
                ? "reviews__review__stars__star--fill"
                : "reviews__review__stars__star--empty"
            }  `}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
