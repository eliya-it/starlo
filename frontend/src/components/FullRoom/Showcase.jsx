import React from "react";
import Section from "../Section/Section";
import { FULL_PATH } from "../../config";

const Showcase = ({ cover, name }) => {
  return (
    <Section className="section--room section--no-border">
      <div className="room">
        <div className="room__showcase">
          <img
            src={`${FULL_PATH}/img/rooms/${cover}`}
            alt={`${name}'s cover on Starlo`}
            className="room__img"
          />
          <div className="room__text">
            <div className="room__heading-background">
              <h4 className="room__heading">{name}</h4>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Showcase;
