import * as actionType from "../actions/actionTypes";

const initialState = {
  userData: [],
  regLoading: false,
  regSuccess: null,
  regErr: null,
  loginLoading: false,
  loginSucc: null,
  loginErr: null,
  message: null,
  jwtToken: null,
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actionType.REGISTRATION_REQUESTED: {
      return {
        ...state,
        regLoading: true,
      };
    }
    case actionType.REGISTRATION_SUCCESS: {
      return {
        ...state,
        regSuccess: "Registration Successful",
        regMsg: action.payload,
      };
    }
    case actionType.REGISTRATION_FAIL: {
      return {
        ...state,
        regLoading: false,
        regErr: action.errMsg,
      };
    }
    case actionType.LOGIN_REQUESTED: {
      return {
        ...state,
        loginLoading: true,
      };
    }
    case actionType.LOGIN_SUCCESS: {
      return {
        ...state,
        loginLoading: false,
        jwtToken: action.payload,
        loginSucc: "You are Successfully loggged in",
      };
    }
    case actionType.LOGIN_FAILED: {
      return {
        ...state,
        loginLoading: false,
        loginErr: action.errMsg,
      };
    }
    case actionType.TEST_REQUESTED: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case actionType.RESET_USER_MSG: {
      return {
        ...state,
        regSuccess: null,
        regErr: null,
        loginErr: null,
        loginSucc: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducerUser;
