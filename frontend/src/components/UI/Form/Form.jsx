import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const Form = ({ onSubmit, children, className, isCol, error, resetError }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form
      className={`form ${isCol ? "form--col" : ""} ${className || ""}`}
      onSubmit={handleFormSubmit}
      // key={uuid()}
    >
      {error && (
        <p className="form__error" key={uuid()}>
          {error}
        </p>
      )}
      {children}
    </form>
  );
};

export default Form;
