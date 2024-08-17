import React, { useState } from "react";
import { Navigate } from "react-router";

const Modal = ({ type, cb, heading, text }) => {
  const hideModalAnimation = {
    style: {},
  };
  const [toggleModal, setToggleModal] = useState(true);
  const toggleHandler = () => setToggleModal(!toggleModal);

  return (
    <>
      {toggleModal ? (
        <div className="modal" style={hideModalAnimation.style}>
          <button className="modal__close" onClick={toggleHandler}>
            <span className="modal__close__icon">&nbsp;</span>
          </button>
          <div className="modal__content">
            {heading ? <h3 className="modal__heading"> {heading}</h3> : null}
            <p
              className={`modal__text ${
                type === "error" ? "modal__text--error" : ""
              }`}
            >
              {text}
            </p>{" "}
            <div className="modal__actions">
              <button
                className={`btn btn--warn`}
                onClick={() => setToggleModal(!toggleModal)}
              >
                No
              </button>{" "}
              <button
                className={`btn btn--primary
                `}
                onClick={() => {
                  toggleHandler();
                  cb();
                  setRedirect(!redirect);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
