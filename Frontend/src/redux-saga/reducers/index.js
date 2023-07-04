import { combineReducers } from "redux";
import reducerUser from "./userReducer";
import policyReducer from "./policyReducer";

const rootReducer = combineReducers({
  reducerUser,
  policyReducer,
});

export default rootReducer;
