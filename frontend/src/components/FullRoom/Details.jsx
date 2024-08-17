import React from "react";
import Feature from "./Feature";
import Section from "../Section/Section";
import {
  LiaBedSolid,
  LiaClockSolid,
  LiaInfoCircleSolid,
  LiaStar,
  LiaUserPlusSolid,
  LiaUsersSolid,
  LiaUtensilsSolid,
} from "react-icons/lia";
import List from "../List/List";
import Container from "../Containers/Container";
const Details = ({ room }) => {
  return (
    <Section className="section--no-border">
      <Container>
        <div className="room-details grid grid--col-2">
          <List isCol>
            <Feature>
              <LiaClockSolid className="icon" />
              <span>12h</span>
            </Feature>
            <Feature>
              <LiaStar className="icon" />
              <span>{`Room got rating of ${room?.ratingsAverage} stars`}</span>
            </Feature>
            <Feature>
              <LiaUsersSolid className="icon" />
              <span>{`Got a ${room?.ratingsQuantity} users reviews`}</span>
            </Feature>
            <Feature>
              <LiaBedSolid className="icon" />
              <span>{`${room?.bedsCount} Available beds`}</span>
            </Feature>
            <Feature>
              <LiaUserPlusSolid className="icon" />
              <span>{`${
                room?.extraBeds === 0
                  ? "There is no extra beds for guests"
                  : "Extra beds are available for guests"
              }`}</span>
            </Feature>
            <Feature>
              <LiaUtensilsSolid className="icon" />
              <span>{`${room?.meals} meals`}</span>
            </Feature>
            <Feature>
              <LiaInfoCircleSolid className="icon" />
              <span>{`${
                room?.status
                  ? "Room is occupied by other people"
                  : "Room is available for booking"
              }`}</span>
            </Feature>
          </List>
          <div className="room-details__description">
            <h3 className="room-details__heading">Room summary:</h3>
            <p className="paragraph">{room?.summary}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Details;
