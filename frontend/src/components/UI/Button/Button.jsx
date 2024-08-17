import React from "react";
import Loader from "../Loader/Loader";

const Button = ({
  type,
  onClick,
  isLoading,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      type={type || "submit"}
      className={className || "btn   btn--form u-center-text u-center-flex"}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Loader isInline /> : children}
    </button>
  );
};

export default Button;
