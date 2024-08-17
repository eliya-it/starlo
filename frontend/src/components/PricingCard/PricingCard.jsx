import React from "react";
import List from "../List/List";
import Item from "../List/Item/Item";
import { LiaCheckSolid } from "react-icons/lia";

const PricingCard = ({
  price,
  heading,
  className,
  isActive,
  description,
  details,
}) => {
  return (
    <div className={`pricing__card ${isActive ? "pricing__card--active" : ""}`}>
      <p
        className={`pricing__price ${isActive ? "pricing__price--active" : ""}`}
      >
        {price} <span>$</span>
      </p>
      <h4 className="pricing__heading">{heading}</h4>
      <p className="pricing__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <List isCol>
        {details.map((feature) => (
          <Item className="u-list__item u-list__item--center" key={feature}>
            <LiaCheckSolid className="pricing__icon" />
            <span>{feature} </span>
          </Item>
        ))}
      </List>
      <a
        className={`${isActive ? "btn btn--white" : "btn btn--primary"}`}
        href="#"
      >
        Buy it
      </a>
    </div>
  );
};

export default PricingCard;
