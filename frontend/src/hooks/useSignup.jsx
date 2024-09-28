import axios from "../axios";
import { useDispatch } from "react-redux";
import { signFail, authSuccess } from "../store/actions/actions";
import { useNavigate } from "react-router";
import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useLocalStorage("user");
  const [error, setError] = useState(null);
  const signupHandler = async (name, email, password, confirmPassword) => {
    try {
      const res = await axios.post(`/users/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });

      const { photo, token, role, expiresIn } = res.data;
      setNewUser({
        name,
        photo,
        role,
        token,
        expiresIn,
      });
      dispatch(
        authSuccess(name, photo, token, role, expiresIn, "SIGNUP_SUCCESS")
      );
      navigate("/");
    } catch (err) {
      dispatch(signFail(err?.response?.data.message));
    }
  };

  return { signup: signupHandler, error };
};

export default useSignup;
