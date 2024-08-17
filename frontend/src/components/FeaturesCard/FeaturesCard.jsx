import React from "react";

const FeaturesCard = ({ icon, heading, description, children }) => {
  return <div className="features__card">{children}</div>;
};

export default FeaturesCard;
