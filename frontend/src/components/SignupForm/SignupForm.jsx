import React, { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
import useValidatePasswords from "../../hooks/useValidatePasswords";
import useSignup from "../../hooks/useSignup";
import { useSelector } from "react-redux";
import Message from "../UI/Message/Message";
import { Navigate } from "react-router";

const SignupForm = () => {
  const { token, error, signupError, loading } = useSelector(
    (state) => state.auth
  );
  const { handler, password, confirmPassword, isDisabled } =
    useValidatePasswords();
  const { signup } = useSignup();

  const signupHandler = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    signup(name, email, password, confirmPassword);
  };

  if (token) return <Navigate to="/me" />;

  return (
    <>
      {token && <Message text="Signed up successfully!" />}
      <Form className="form" onSubmit={signupHandler} error={signupError}>
        <Input label="Full Name" id="name" min={4} max={18} />
        <Input label="Email" id="email" type="email" />
        <Input
          type="password"
          label="Password"
          name="password"
          id="password"
          min={6}
          max={32}
          onChange={handler}
        />
        <Input
          type="password"
          label="Confirm Passwoard"
          name="confirmPassword"
          id="confirmPassword"
          password={password}
          min={8}
          max={32}
          onChange={handler}
          isConfirmPassword
        />
        <Button
          type="submit"
          id="name"
          isLoading={loading}
          disabled={isDisabled}
        >
          Signup
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
