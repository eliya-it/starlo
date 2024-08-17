import React, { useState, useEffect } from "react";
import ValidateOptions from "../../../utils/validateOpts";

const Input = ({
  onChange,
  className,
  placeholder,
  value,
  id,
  type = "text",
  options,
  isLight,
  label,
  min,
  max = 32,
  selId,
  name,
  required = true,
  validationMsg,
  isConfirmPassword,
  password,
  ref,
}) => {
  const [errMsg, setErrMsg] = useState(validationMsg);

  const checkValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateInput = (type, val) => {
    const minPassword = ValidateOptions.password.min;
    if (type === "password" && val.length < minPassword) {
      return `Password must be between ${minPassword}-${ValidateOptions.password.max} characters.`;
    } else if (
      type === "password" &&
      isConfirmPassword &&
      val.length > minPassword &&
      val !== password
    )
      return "Passwords are not the same!";
    else if (type === "email" && !checkValidEmail(val)) {
      return "Invalid email!";
    } else if (type === "text" && val.length < min) {
      return `${label} must be between ${min} and ${max} characters.`;
    }
    return null;
  };

  useEffect(() => {
    setErrMsg(validationMsg);
  }, [validationMsg]);

  const onChangeHandler = (e) => {
    const val = e.target.value;
    const errorMsg = validateInput(type, val);
    setErrMsg(errorMsg);
    if (onChange) onChange(e);
  };

  const renderInput = () => {
    if (type === "select") {
      return (
        <select onChange={onChange} className="form__select" name={name}>
          {options.map((opt) => (
            <option value={opt.value} key={opt.label}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        className={`${className} form__input ${
          errMsg ? "form__input--error" : ""
        }`}
        type={type}
        placeholder={placeholder}
        id={id}
        ref={ref}
        onChange={onChangeHandler}
        minLength={min}
        maxLength={max}
        name={name}
        required={required}
        key={selId || id}
        defaultValue={value || ""}
      />
    );
  };

  const isRequired = ["email", "name", "password"].includes(type);
  const requiredLabel = `${label ? `${isRequired ? `${label}*` : label}` : ""}`;
  return (
    <div className="form__control">
      <label
        htmlFor={id}
        className={`form__label ${isLight ? "form__label--light" : ""}`}
      >
        {requiredLabel}
      </label>
      {renderInput()}
      {errMsg && <p className="form__message">{errMsg}</p>}
    </div>
  );
};

export default Input;
