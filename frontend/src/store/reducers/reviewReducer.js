import updateObject from "../../utils/updateObj";
const initialState = {
  review: null,
  loading: false,
};
const reviewStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const reviewRes = (state, action) => {
  return updateObject(state, {
    review: action.review,
    loading: false,
    room: action.room,
  });
};
const reviewError = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REVIEW_START":
      return reviewStart(state, action);
    case "REVIEW_RESPONSE":
      return reviewRes(state, action);
    case "REVIEW_ERROR":
      return reviewError(state, action);
    default:
      return state;
  }
};
export default reviewReducer;
