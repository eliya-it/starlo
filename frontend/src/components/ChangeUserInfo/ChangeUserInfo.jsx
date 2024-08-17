import React, { useCallback, useEffect } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useHttp from "../../hooks/http";
import Message from "../UI/Message/Message";
import Form from "../UI/Form/Form";
import Heading from "../Typography/Heading";
import { FULL_PATH } from "../../config";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader/Loader";
import useUpdate from "../../hooks/useUpdate";
const ChangeUserInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const { update, message, isLoading } = useUpdate();
  const {
    sendRequest: getUserInfo,
    data: userInfo,
    error,
    isLoading: getUserInfoLoading,
  } = useHttp();
  const updateInformationHandler = useCallback((e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const userPhoto = document.getElementById("photo").files[0];
    update(name, email, userPhoto);
  }, []);
  useEffect(() => {
    getUserInfo(`/users/me`, "GET", true);
  }, [user]);

  return (
    <div className="change-info">
      {error && error?.status === 429 && (
        <Message text={error?.data.message} status="fail" />
      )}
      {getUserInfoLoading && <Loader isFull />}
      {error && <Message text={error?.data.message} status="fail" />}
      {message && <Message text={message} />}
      <Heading isTertiary>Change information</Heading>
      <Form onSubmit={updateInformationHandler}>
        <Input
          label="Full Name"
          id="name"
          min={4}
          value={userInfo?.data.doc.name}
        />
        <Input
          label="Email"
          type="email"
          id="email"
          value={userInfo?.data.doc.email}
        />

        <div className="form__control u-flex u-flex--center">
          {" "}
          <img
            src={`${FULL_PATH}/img/users/${
              user.photo || userInfo?.data.doc.photo
            }`}
            alt="User photo on Starlo"
            className="form__img"
          />
          <label className="form__label form__label--file" htmlFor="photo">
            Change photo
          </label>
          <input
            className="form__input--file"
            type="file"
            name="photo"
            accept="image/*"
            id="photo"
          />
        </div>
        <Button type="submit" isInline isLoading={isLoading}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default ChangeUserInfo;
