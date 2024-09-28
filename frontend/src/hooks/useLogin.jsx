import React, { useCallback, useReducer, useState } from "react";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { authSuccess, authStart, loginFail } from "../store/actions/actions";
import { useNavigate } from "react-router";
import useLocalStorage from "./useLocalStorage";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user");
  const [isLoading, setIsLoading] = useState(false);
  const loginHandler = (email, password) => {
    dispatch(authStart());
    setIsLoading(true);
    axios
      .post("/users/login", { email, password })
      .then((resBody) => {
        const { token, name, photo, role, expiresIn } = resBody.data;

        setUser({
          name,
          photo,
          role,
          token,
          expiresIn,
        });

        setIsLoading(false);

        dispatch(
          authSuccess(name, photo, token, role, expiresIn, "LOGIN_SUCCESS")
        );
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(loginFail(err?.response?.data.message));
      });
  };

  return { loginHandler, isLoading };
};

export default useLogin;
