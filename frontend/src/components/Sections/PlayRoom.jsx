import React from "react";
import photoOne from "../../assets/img/kids-room.jpg";
import photoOneLazy from "../../assets/img/kids-room-lazy.jpg";

import photoTwo from "../../assets/img/kids-room-2.jpg";
import photoTwoLazy from "../../assets/img/kids-room-2-lazy.jpg";
import Reveal from "../../Animations/Reveal";
import Scale from "../../Animations/Scale";
import Container from "../Containers/Container";
import Section from "../Section/Section";
import Heading from "../Typography/Heading";
import Photo from "../Photo/Photo";
import Animate from "../UI/Animate";
import Paragraph from "../UI/Paragraph";
import { Link } from "react-router-dom";
const PlayRoom = () => {
  return (
    <Section className="section--room-play " id="section--room-play">
      <Container>
        <div className="info">
          <Photo
            src={photoOne}
            lazySrc={photoOneLazy}
            className="info__img info__img--1 "
          />

          <Animate
            className="info__text info__text--1 "
            hidden={{
              translateY: "20rem",
              opacity: 0,
            }}
            visible={{
              translateY: "0",
              opacity: 1,
            }}
          >
            <Heading
              className="info__heading heading--tertiary  u-margin-top-medium"
              isTertiary
            >
              Special activities for children
            </Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              minima esse vitae quia commodi quas dolorem deserunt ad optio.
              Quos!minima esse vitae quia commodi quas dolorem deserunt ad
              optio. Quos!minima esse vitae quia commodi quas dolorem deserunt
              ad optio. Quos!
            </Paragraph>
          </Animate>

          <Animate
            className="info__text info__text--2"
            hidden={{
              translateY: "20rem",
              opacity: 0,
            }}
            visible={{
              translateY: "0",
              opacity: 1,
            }}
          >
            {" "}
            <Heading
              className="info__heading heading--tertiary  u-margin-top-medium"
              isTertiary
            >
              Perfect rooms only for kids
            </Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              minima esse vitae quia commodi quas dolorem deserunt ad optio.
              Quos!minima esse vitae quia commodi quas dolorem deserunt ad
              optio. Quos!minima esse vitae quia commodi quas dolorem deserunt
              ad optio. Quos!
            </Paragraph>
          </Animate>
          <Photo
            className="info__img info__img--2 "
            src={photoTwo}
            lazySrc={photoTwoLazy}
            alt="Kid playing with his father"
          />
        </div>
      </Container>
      <div className="u-center-text u-margin-top-big">
        <Link className="btn--text" to="/about">
          Learn more
        </Link>
      </div>
    </Section>
  );
};

export default PlayRoom;
