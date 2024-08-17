import React from "react";

const Textarea = ({ name, id, onChange, placeholder, label }) => {
  return (
    <div className="form__control">
      <label className="form__label">{label}</label>
      <textarea
        className="form__textarea"
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default Textarea;
