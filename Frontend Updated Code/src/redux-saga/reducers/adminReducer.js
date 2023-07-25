import * as actionType from "../actions/actionTypes";

const initialState = {
  adminLoginLoading: false,
  adminLoginSucc: null,
  adminLoginErr: null,
  jwtToken: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADMIN_LOGIN_REQUESTED: {
      return {
        ...state,
        adminLoginLoading: true,
      };
    }
    case actionType.ADMIN_LOGIN_SUCCESS: {
      return {
        ...state,
        jwtToken: action.payload,
        adminLoginSucc: "Login Successfully",
        adminLoginLoading: false,
      };
    }
    case actionType.ADMIN_LOGIN_FAILED: {
      return {
        ...state,
        adminLoginErr: action.errMsg,
        adminLoginLoading: false,
      };
    }
    case actionType.RESET_ADMIN_MSG: {
      return {
        ...state,
        adminLoginErr: null,
        adminLoginSucc: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default adminReducer;
