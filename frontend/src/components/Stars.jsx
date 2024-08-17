import React, { useState } from "react";
import { LiaStarSolid } from "react-icons/lia";

import { v4 as uuid } from "uuid";
const Stars = ({ roomID, handler }) => {
  const [rating, setRating] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const handleRating = (num) => {
    setRating(num);
    setShowReview(!showReview);
    handler({ rating: num });
  };

  return (
    <>
      <div className="stars">
        {" "}
        {[1, 2, 3, 4, 5].map((i) => (
          <LiaStarSolid
            key={uuid()}
            onClick={() => handleRating(i)}
            className={`stars__star  ${
              i <= rating ? "stars__star--fill" : "stars__star--empty"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Stars;
