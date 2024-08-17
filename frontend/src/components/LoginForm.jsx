import React, { useEffect, useState } from "react";
import Form from "./UI/Form/Form";
import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";
import useLogin from "../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
import Message from "./UI/Message/Message";
import { Navigate } from "react-router";
import { clearError } from "../store/actions/actions";

const LoginForm = () => {
  const { loginHandler: login, isLoading, status } = useLogin();
  const { loginError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loginHandler = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <>
      {status && <Message text="Logged in successfully!" />}
      {status && <Navigate to="/" />}
      <Form className="form" onSubmit={loginHandler} error={loginError}>
        <Input type="email" id="email" label="Email" />
        <Input
          type="password"
          id="password"
          label="Password"
          min={8}
          max={32}
        />
        <Button isInline isLoading={isLoading}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
