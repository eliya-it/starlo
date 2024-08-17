import React, { useState } from "react";
import Stars from "./Stars";
import ReviewForm from "./ReviewForm";
import Section from "./Section/Section";
import { useDispatch, useSelector } from "react-redux";
import { reviewRes, reviewStart } from "../store/actions/actions";
import useHttp from "../hooks/http";
import Heading from "./Typography/Heading";
import Message from "./UI/Message/Message";
const AddReview = ({ roomID }) => {
  const dispatch = useDispatch();
  const { sendRequest, data, error, isLoading, status } = useHttp();
  const { user } = useSelector((state) => state.auth);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: "",
  });
  const handleData = (obj) => {
    setReviewData({ ...reviewData, ...obj });
  };
  const handleReview = (e) => {
    dispatch(reviewStart());
    e.preventDefault();
    sendRequest(`/rooms/${roomID}/reviews`, "POST", true, reviewData);
    dispatch(reviewRes({ room: roomID }));
  };
  if (user?.token) {
    return (
      <Section>
        {error && (
          <Message
            text="Sorry, you can submit a review only once!"
            status="fail"
          />
        )}
        {status && <Message text="Your review has been added to this room!" />}
        <div className="add-review">
          <Stars handler={handleData} />
          <ReviewForm
            onSubmit={handleReview}
            handler={handleData}
            disabled={reviewData.rating === 0 && reviewData.review === ""}
            isLoading={isLoading}
          />
        </div>
      </Section>
    );
  } else
    return (
      <Heading className="u-center-text" isTertiary>
        You must login to review!
      </Heading>
    );
};

export default AddReview;
