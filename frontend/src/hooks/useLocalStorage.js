import React, { useState } from "react";

const useLocalStorage = (key, initialVal = {}) => {
  const storedVal = JSON.parse(localStorage.getItem(key));
  const [val, setVal] = useState(storedVal || initialVal);
  const setNewVal = (newVal) => {
    setVal(newVal);
    localStorage.setItem(key, JSON.stringify(newVal));
  };
  return [val, setNewVal];
};

export default useLocalStorage;
