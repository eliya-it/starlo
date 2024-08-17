import React from "react";
import { logout as logoutAction } from "../store/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("user");
    navigate("/");
  };
  return { logout };
};

export default useLogout;
