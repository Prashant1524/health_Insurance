import * as actionType from "./actionTypes";

export const registerUser = (payload) => {
  return {
    type: actionType.REGISTRATION_REQUESTED,
    payload,
  };
};

export const login = (payload) => {
  return {
    type: actionType.LOGIN_REQUESTED,
    payload,
  };
};

export const getPolicies = (payload) => {
  return {
    type: actionType.GET_POLICIES_REQUESTED,
    payload,
  };
};

export const sendMessage = (payload) => {
  return {
    type: actionType.TEST_REQUESTED,
    payload,
  };
};

export const resetUserMsg = () => {
  return {
    type: actionType.RESET_USER_MSG,
  };
};
