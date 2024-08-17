import React from "react";
import FeaturesCard from "../FeaturesCard/FeaturesCard";
import Grid from "../Containers/Layout/Grid";
import {
  LiaBabyCarriageSolid,
  LiaHeart,
  LiaLeafSolid,
  LiaMapSolid,
  LiaUsersSolid,
  LiaWifiSolid,
} from "react-icons/lia";
import Heading from "../Typography/Heading";
import Section from "../Section/Section";
import Paragraph from "../UI/Paragraph";
import Animate from "../UI/Animate";
const Features = () => {
  return (
    <Section className="section--features" id="section--features">
      <Heading isSecondary>Some of our features</Heading>

      <Animate hidden={{ opacity: 0 }} visible={{ opacity: 1 }}>
        <Grid col="3" className="container">
          <FeaturesCard>
            <LiaLeafSolid className="features__icon" />
            <Heading isTertiary>A beautiful scenery</Heading>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              voluptatum, laborum voluptate assumenda eaque magni?
            </Paragraph>
          </FeaturesCard>
          <FeaturesCard>
            <LiaHeart className="features__icon" />
            <Heading isTertiary>Healthy food</Heading>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              voluptatum, laborum voluptate assumenda eaque magni?
            </Paragraph>
          </FeaturesCard>
          <FeaturesCard>
            <LiaMapSolid className="features__icon" />
            <Heading isTertiary>Amazing tours</Heading>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              voluptatum, laborum voluptate assumenda eaque magni?"
            </Paragraph>
          </FeaturesCard>
          <FeaturesCard>
            <LiaUsersSolid className="features__icon" />
            <Heading isTertiary>perfect for meeting</Heading>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              voluptatum, laborum voluptate assumenda eaque magni?
            </Paragraph>
          </FeaturesCard>
          <FeaturesCard>
            <LiaBabyCarriageSolid className="features__icon" />
            <Heading isTertiary>Special place for kids</Heading>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              voluptatum, laborum voluptate assumenda eaque magni?
            </Paragraph>
          </FeaturesCard>
          <FeaturesCard>
            <LiaWifiSolid className="features__icon" />
            <Heading isTertiary>A free wifi for your needs</Heading>
            <Paragraph>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              voluptatum, laborum voluptate assumenda eaque magni?
            </Paragraph>
          </FeaturesCard>
        </Grid>
      </Animate>
    </Section>
  );
};

export default Features;
