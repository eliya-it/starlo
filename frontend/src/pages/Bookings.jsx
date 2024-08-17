import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Containers/Container";
import Section from "../components/Section/Section";
import Heading from "../components/Typography/Heading";
import useHttp from "../hooks/http";
import { useSelector } from "react-redux";
import NewBookings from "../components/NewBookings";
import BookingsBox from "../components/BookingsBox";
import PageTransition from "../components/Containers/PageTransition";
import Message from "../components/UI/Message/Message";

const Bookings = () => {
  const { user } = useSelector((state) => state.auth);
  const { sendRequest, data, error, status } = useHttp();
  const {
    sendRequest: deleteOrder,
    data: deletedData,
    error: deleteError,
    isLoading: deleteLoader,
  } = useHttp();
  const [totalPrice, setTotalPrice] = useState(0);
  const deleteBookingHandler = (roomId, orderId) => {
    deleteOrder(`/users/${roomId}/booking/${orderId}`, "DELETE", true);
  };

  useEffect(() => {
    sendRequest(`/booking`, "GET", true);
  }, [deletedData]);
  useEffect(() => {
    let sum = 0;
    data?.data.docs.map((room) => (sum += room.room.price));
    setTotalPrice(sum);
  }, [data]);
  return (
    <PageTransition>
      {error && <Message text={error?.data.message} status="fail" />}
      <Section>
        {!user?.token ? (
          <Heading className="u-center-text" isTertiary>
            You must login to see your bookings!
          </Heading>
        ) : (
          <Container className="u-flex ">
            <NewBookings
              books={data?.data.docs}
              deleteHandler={deleteBookingHandler}
            />

            {data?.data.docs.length > 0 ? (
              <BookingsBox totalPrice={totalPrice} bookings={data?.data.docs} />
            ) : null}
          </Container>
        )}
      </Section>
    </PageTransition>
  );
};

export default Bookings;
