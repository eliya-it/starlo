export const authStart = () => ({
  type: "AUTH_START",
  loading: true,
});
export const clearError = () => ({
  type: "CLEAR_ERROR",
});
export const authSuccess = (name, photo, token, role, expiresIn, type) => {
  return {
    type,
    name,
    photo,
    token,
    role,
    expiresIn,
    loading: false,
  };
};
export const updateStart = () => {
  return {
    type: "UPDATE_START",
    loading: true,
  };
};

export const loginFail = (error) => {
  return {
    type: "LOGIN_FAIL",
    error,
  };
};
export const signFail = (error) => {
  return {
    type: "SIGNUP_FAIL",
    error,
  };
};
export const updateFail = (error) => {
  return {
    type: "UPDATE_FAIL",
    error,
  };
};
export const updateSuccess = (name, email, photo, token, role) => {
  return {
    type: "UPDATE_SUCCESS",
    name,
    email,
    photo,
    token,
    role,
    loading: false,
  };
};

export const signup = () => ({
  type: "SIGNUP",
});
export const updateUserData = () => ({
  type: "UPDATE_USER_DATA",
});
export const reviewStart = (state, action) => {
  return {
    type: "REVIEW_START",
    error: null,
    loading: true,
  };
};
export const reviewRes = (room) => ({
  type: "REVIEW_RESPONSE",
  room,
  loading: false,
});
export const logout = () => {
  return {
    type: "LOGOUT",
    auth: null,
    user: null,
    name: null,
    photo: null,
    token: null,
    role: null,
  };
};
