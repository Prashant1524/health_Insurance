import * as actionType from "../actions/actionTypes";

const initialState = {
  userData: null,
  userDataLoading: false,
  userDataErr: null,
  regLoading: false,
  regSuccess: null,
  regErr: null,
  loginLoading: false,
  loginSucc: null,
  loginErr: null,
  message: null,
  jwtToken: null,
  otpLoading: false,
  otpMsg: null,
  otpErr: null,
  setPassMsg: null,
  setErrMsg: null,
  updateLoading: false,
  allUsersData: null,
  allUsersLoading: false,
  allUsersErr: null,
  sendQueryLoading: false,
  sendQuerySucc: null,
  sendQueryErr: null,
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
        regLoading: false,
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
    case actionType.GET_USER_DATA_REQUESTED: {
      return {
        ...state,
        userDataLoading: true,
      };
    }
    case actionType.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        userDataLoading: false,
      };
    }
    case actionType.GET_USER_DATA_FAIL: {
      return {
        ...state,
        userDataErr: action.errMsg,
      };
    }
    case actionType.SEND_OTP_REQUESTED: {
      return {
        ...state,
        otpLoading: false,
      };
    }
    case actionType.SEND_OTP_SUCCESS: {
      return {
        ...state,
        otpMsg: action.payload,
      };
    }
    case actionType.SEND_OTP_FAIL: {
      return {
        ...state,
        otpErr: action.errMsg,
      };
    }
    case actionType.RESET_USER_DATA_MSG: {
      return {
        ...state,
        otpMsg: null,
        otpErr: null,
      };
    }
    case actionType.RESET_OTP_MSG: {
      return {
        ...state,
        otpMsg: null,
        otpErr: null,
      };
    }
    case actionType.UPDATE_USER_REQUESTED: {
      return {
        ...state,
        updateLoading: true,
      };
    }
    case actionType.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateLoading: false,
        setPassMsg: action.payload,
      };
    }
    case actionType.UPDATE_USER_FAIL: {
      return {
        ...state,
        updateLoading: false,
        setErrMsg: action.errMsg,
      };
    }
    case actionType.POST_QUERY_REQUESTED: {
      return {
        ...state,
        sendQueryLoading: true,
      };
    }
    case actionType.POST_QUERY_SUCCESS: {
      return {
        ...state,
        sendQuerySucc: action.payload,
        sendQueryLoading: false,
      };
    }
    case actionType.POST_QUERY_FAILED: {
      return {
        ...state,
        sendQueryLoading: false,
        sendQueryErr: action.errMsg,
      };
    }
    case actionType.RESET_QUERY_MSG: {
      return {
        ...state,
        sendQuerySucc: null,
        sendQueryErr: null,
      };
    }
    case actionType.GET_ALL_USERS_REQUESTED: {
      return {
        ...state,
        allUsersLoading: true,
      };
    }
    case actionType.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        allUsersData: action.payload,
        allUsersLoading: false,
      };
    }
    case actionType.GET_ALL_USERS_FAILED: {
      return {
        ...state,
        allUsersErr: action.errMsg,
        allUsersLoading: false,
      };
    }
    case actionType.RESET_USERDATA_MSG: {
      return {
        ...state,
        userData: null,
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
