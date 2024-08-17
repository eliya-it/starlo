import React, { useCallback, useEffect, useState } from "react";
import Form from "../UI/Form/Form";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useHttp from "../../hooks/http";
import Message from "../UI/Message/Message";
import Heading from "../Typography/Heading";
import useValidatePasswords from "../../hooks/useValidatePasswords";
import ValidateOptions from "../../utils/validateOpts";
const ChangeUserPassword = () => {
  const { handler, password, confirmPassword, isDisabled } =
    useValidatePasswords();
  const { sendRequest, data, status, error, isLoading } = useHttp();

  const updatePasswordHandler = () => {
    const currentPassword = document.getElementById("curPassword").value;

    sendRequest(`/users/updateMyPassword`, "PATCH", true, {
      currentPassword,
      newPassword: password,
      newConfirmPassword: confirmPassword,
    });
  };

  if (status === "success") {
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: data.userId,
        token: data.token,
        role: data.role,
        name: data.name,
        photo: data.photo,
      })
    );
  }

  return (
    <div className="change-info">
      {" "}
      {error && <Message text={error.response.data.message} status="fail" />}
      {status && <Message text="Password updated successfully!" />}
      <Heading isTertiary>Change Password</Heading>
      <Form
        onSubmit={updatePasswordHandler}
        msg={
          password !== confirmPassword && confirmPassword !== ""
            ? "Passwords does not match!"
            : ""
        }
      >
        <Input
          label="Current Password"
          type="password"
          id="curPassword"
          name="curPassword"
          onChange={handler}
        />
        <Input
          label="New Password"
          type="password"
          name="password"
          onChange={handler}
        />
        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          onChange={handler}
          password={password}
          isConfirmPassword
        />
        <Button
          type="submit"
          isInline
          isLoading={isLoading}
          disabled={isDisabled}
        >
          Update
        </Button>
      </Form>
    </div>
  );
};

export default ChangeUserPassword;
