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

export const getUserDetails = (payload) => {
  return {
    type: actionType.GET_USER_DATA_REQUESTED,
    payload,
  };
};

export const getAnnouncement = () => {
  return {
    type: actionType.GET_ANNOUNCEMENT_REQUESTED,
  };
};

export const addAnnouncement = (payload) => {
  return {
    type: actionType.ADD_ANNOUNCEMENT_REQUESTED,
    payload,
  };
};

export const getUserPolicy = (payload) => {
  return {
    type: actionType.GET_USER_POLICIES_REQUESTED,
    payload,
  };
};

export const addUserPolicy = (payload) => {
  return {
    type: actionType.ADD_USER_POLICIES_REQUESTED,
    payload,
  };
};

export const addPolicy = (payload) => {
  return {
    type: actionType.ADD_NEW_POLICY_REQUESTED,
    payload,
  };
};

export const resetPolicyMsg = () => {
  return {
    type: actionType.RESET_POLICY_MSG,
  };
};

export const resetAnnMsg = () => {
  return {
    type: actionType.RESET_ANN_MSG,
  };
};

export const getPosition = (payload) => {
  return {
    type: actionType.GET_POSITION_REQUESTED,
    payload,
  };
};

export const updatePosition = (payload) => {
  return {
    type: actionType.ADD_POSITION_REQUESTED,
    payload,
  };
};

export const getReview = (payload) => {
  return {
    type: actionType.GET_REVIEW_REQUESTED,
    payload,
  };
};

export const addReview = (payload) => {
  return {
    type: actionType.ADD_REVIEW_REQUESTED,
    payload,
  };
};

export const sendOtpToEmail = (payload) => {
  return {
    type: actionType.SEND_OTP_REQUESTED,
    payload,
  };
};

export const resetOtpMsg = () => {
  return {
    type: actionType.RESET_OTP_MSG,
  };
};

export const resetUserDataMsg = () => {
  return {
    type: actionType.RESET_USER_DATA_MSG,
  };
};

export const updateUserPassword = (payload) => {
  return {
    type: actionType.UPDATE_USER_REQUESTED,
    payload,
  };
};

export const resetMsg = () => {
  return {
    type: actionType.RESET_MSG,
  };
};

export const updateTestimonial = (payload) => {
  return {
    type: actionType.UPDATE_TESTIMONIAL_REQUESTED,
    payload,
  };
};

export const deleteTestimonial = (payload) => {
  return {
    type: actionType.DELETE_TESTIMONIAL_REQUESTED,
    payload,
  };
};

export const getAllUsers = (payload) => {
  return {
    type: actionType.GET_ALL_USERS_REQUESTED,
    payload,
  };
};

export const postQuery = (payload) => {
  return {
    type: actionType.POST_QUERY_REQUESTED,
    payload,
  };
};

export const resetQueryMsg = () => {
  return {
    type: actionType.RESET_QUERY_MSG,
  };
};

export const adminLogin = (payload) => {
  return {
    type: actionType.ADMIN_LOGIN_REQUESTED,
    payload,
  };
};

export const resetAdminMsg = () => {
  return {
    type: actionType.RESET_ADMIN_MSG,
  };
};

export const resetUserMsgLogout = () => {
  return {
    type: actionType.RESET_USERDATA_MSG,
  };
};
