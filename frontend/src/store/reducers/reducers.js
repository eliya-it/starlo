import { combineReducers } from "redux";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  review: reviewReducer,
});
export default rootReducer;
