import React from "react";

const InputImg = ({ photo, id, text, onChange, isMulti }) => {
  return (
    <div className="form__control u-flex u-flex--center">
      {photo ? (
        <img src={photo} alt="User photo on Starlo" className="form__img" />
      ) : null}
      <label className="form__label form__label--file" htmlFor={id}>
        {text}{" "}
      </label>
      <input
        className="form__input--file"
        type="file"
        accept="image/*"
        id={id}
        onChange={onChange || null}
        multiple={isMulti ? true : null}
      />
    </div>
  );
};

export default InputImg;
