import updateObject from "../../utils/updateObj";

const initialState = {
  error: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};
const authStart = (state = initialState, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const loginFail = (state = initialState, action) => {
  return updateObject(state, {
    loginError: action.error,
    loading: false,
  });
};
const clearError = (state = initialState, action) => {
  return updateObject(state, {
    error: null,
    loginError: null,
    signupError: null,
    loading: false,
  });
};
const updateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    user: {
      token: action.token,
      error: null,
      loading: false,
      isAuthenticated: true,
      userId: action.userId,
      name: action.name,
      photo: action.photo,
      expiresIn: action.expiresIn,
      role: action.role,
    },
  });
};
const updateSuccess = (state, action) => {
  return updateObject(state, {
    user: {
      name: action.name,
      email: action.email,
      photo: action.photo,
      token: action.token,
    },
    loading: false,
  });
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return authStart(state, action);
    case "SIGNUP_START":
      return authStart(state, action);
    case "LOGIN_SUCCESS":
      return authSuccess(state, action);
    case "SIGNUP_SUCCESS":
      return authSuccess(state, action);
    case "LOGIN_FAIL":
      return loginFail(state, action);

    case "SIGNUP_FAIL":
      return updateObject(state, { signupError: action.error });
    case "UPDATE_START":
      return updateStart(state, action);
    case "UPDATE_SUCCESS":
      return updateSuccess(state, action);
    case "CLEAR_ERROR":
      return clearError(state, action);
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
