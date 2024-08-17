import React from "react";
import { FULL_PATH } from "../../config";
import Section from "../Section/Section";

const Photos = ({ photos, name }) => {
  return (
    <Section className="section--room-images ">
      <div className="room-images">
        <ul className="room-images__container grid grid--col-3 grid--no-gap">
          {photos?.map((photo) => (
            <li key={photo}>
              <img
                src={`${FULL_PATH}/img/rooms/${photo}`}
                alt={`${name}'s photo on Starlo`}
                className="room-images__image"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Photos;
