import { combineReducers } from "redux";
import reducerUser from "./userReducer";
import policyReducer from "./policyReducer";
import announcementReducer from "./aanouncementReducer";
import userPolicyReducer from "./userPolicyReducer";
import testimonialReducer from "./testimonialReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  reducerUser,
  policyReducer,
  announcementReducer,
  userPolicyReducer,
  testimonialReducer,
  adminReducer,
});

export default rootReducer;
