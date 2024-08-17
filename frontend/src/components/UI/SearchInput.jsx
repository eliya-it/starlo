import React from "react";
import { LiaSearchSolid } from "react-icons/lia";
const SearchInput = ({
  onChange,
  value,
  placeholder,
  className,
  id,
  isRequired,
  disableVald,
}) => {
  return (
    <div className={`search-input ${className ? className : ""}`}>
      <input
        className="search-input__input"
        type="search"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        id={id}
        required={isRequired}
        aria-invalid={disableVald}
      />

      <LiaSearchSolid className="search-input__icon" />
    </div>
  );
};

export default SearchInput;
