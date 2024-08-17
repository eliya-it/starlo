import React, { useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../hooks/http";
import Message from "../components/UI/Message/Message";
import Loader from "../components/UI/Loader/Loader";
import { useSelector } from "react-redux";
import Reviews from "../components/Reviews/Reviews";
import AddReview from "../components/AddReview";
import Details from "../components/FullRoom/Details";
import Showcase from "../components/FullRoom/Showcase";
import Photos from "../components/FullRoom/Photos";
import Booking from "../components/FullRoom/Booking";
import PageTransition from "../components/Containers/PageTransition";

const Room = () => {
  const { slug } = useParams();
  const { sendRequest, data, error, isLoading } = useHttp();
  const review = useSelector((state) => state.review);
  useEffect(() => {
    sendRequest(`/rooms/${slug}`);
  }, [slug, review]);
  return (
    <PageTransition>
      {isLoading && <Loader isLoading={isLoading} isFetch />}

      {error ? (
        <Message text={error?.data.message} status="fail" />
      ) : (
        <>
          {/* Room showcase */}
          <Showcase cover={data?.data.doc.cover} name={data?.data.doc.name} />
          {/* Room Details */}
          <Details room={data?.data.doc} />
          {/* Room Photos */}
          <Photos photos={data?.data.doc.photos} name={data?.data.doc.name} />
          {/* Room Booking */}
          <Booking roomID={data?.data.doc._id} name={data?.data.doc.name} />
          {/* Add Review */}
          <AddReview roomID={data?.data.doc._id} />
          {/* Reviews Section */}
          {!isLoading && <Reviews roomID={data?.data.doc._id} />}
        </>
      )}
    </PageTransition>
  );
};

export default Room;
