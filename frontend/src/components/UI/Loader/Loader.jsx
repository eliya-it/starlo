import React from "react";

const Loader = ({ isInline, isFetch, isFull, center }) => {
  return (
    <>
      {" "}
      {isFetch ? (
        <div className="u-center-el">
          <span className="loader--inline loader--fetch"></span>
        </div>
      ) : null}
      {isInline ? <span className="loader--inline"></span> : null}
      {isFull ? (
        <div className={`loader ${center ? "u-center-text" : ""}`}>
          <div className="loader__load">&nbsp;</div>
        </div>
      ) : null}
    </>
  );
};

export default Loader;
