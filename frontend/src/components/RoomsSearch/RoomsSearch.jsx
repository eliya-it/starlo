import React from "react";
import Grid from "../Containers/Layout/Grid";
import Room from "../Room/Room";
import Heading from "../Typography/Heading";
const RoomsSearch = ({ rooms }) => {
  return (
    <Grid col={3}>
      {rooms?.map((room) => (
        <Room room={room} key={room._id} />
      ))}
    </Grid>
  );
};

export default RoomsSearch;
