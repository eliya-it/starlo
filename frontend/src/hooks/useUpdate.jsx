import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess } from "../store/actions/actions";
import { updateFail } from "../store/actions/actions";
import axios from "../axios";
import useLocalStorage from "./useLocalStorage";

const useUpdate = () => {
  const [curUser, setCurUser] = useLocalStorage("user");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const update = (name, email, photo) => {
    dispatch(updateStart());
    setIsLoading(true);
    axios
      .patch(
        `/users/updateMe`,
        {
          name,
          email,
          photo,
        },
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resBody) => {
        setIsLoading(false);

        const { name, photo, email } = resBody?.data?.data.user;
        setCurUser({
          name,
          email,
          photo,
          token: user.token,
        });
        dispatch(updateSuccess(name, email, photo, user.token));
        setMsg("Information updated successfully!");
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(updateFail(err?.response?.data.message));
        setMsg(err?.response.data.message);
      });
  };

  return { update, message: msg, isLoading };
};

export default useUpdate;
