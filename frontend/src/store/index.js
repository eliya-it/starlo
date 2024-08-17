import { combineReducers } from "redux";
import authReducer from "./auth";
import updateReducer from "./updateInformation";

const rootReducer = combineReducers({
  auth: authReducer,
  update: updateReducer,
});
export default rootReducer;
