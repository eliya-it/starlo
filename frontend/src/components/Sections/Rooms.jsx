import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/http";
import Grid from "../Containers/Layout/Grid";
import Room from "../Room/Room";
import { Link } from "react-router-dom";

import Section from "../Section/Section";
import Heading from "../Typography/Heading";
import Animate from "../UI/Animate";
import Loader from "../UI/Loader/Loader";
import Message from "../UI/Message/Message";
import Error from "../UI/Error";
const Rooms = () => {
  const { sendRequest, data, error, status, isLoading } = useHttp();

  useEffect(() => {
    sendRequest(`/rooms?page=1&limit=3`, "GET", true);
  }, []);
  return (
    <Section className="section--rooms" id="section--rooms">
      <Heading isSecondary>Comfy rooms & good price</Heading>
      <Animate
        visible={{ opacity: 1 }}
        hidden={{ opacity: 0 }}
        className="container"
      >
        {" "}
        {isLoading && <Loader isFetch center />}
        {error && <Error error={error?.data.message} />}
        <Grid col="3">
          {data?.data.docs.map((room) => (
            <Room room={room} key={room._id} />
          ))}
        </Grid>
        {!error ? (
          <div className="u-center-text u-margin-top-big">
            <Link className="btn--text" href="/rooms">
              See more rooms →
            </Link>
          </div>
        ) : null}
      </Animate>
    </Section>
  );
};

export default Rooms;
