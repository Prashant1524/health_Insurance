import * as actionType from "../actions/actionTypes";

const initialState = {
  userPolicy: null,
  loading: false,
  err: null,
  addSucc: "",
  addErr: "",
  addLoading: false,
};

const userPolicyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER_POLICIES_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionType.GET_USER_POLICIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        userPolicy: action.payload,
      };
    }
    case actionType.GET_USER_POLICIES_FAILED: {
      return {
        ...state,
        loading: false,
        err: action.errMsg,
      };
    }
    case actionType.ADD_USER_POLICIES_REQUESTED: {
      return {
        ...state,
        addLoading: true,
      };
    }
    case actionType.ADD_USER_POLICIES_SUCCESS: {
      return {
        ...state,
        addLoading: false,
        addSucc: action.payload,
      };
    }
    case actionType.ADD_USER_POLICIES_FAILED: {
      return {
        ...state,
        addLoading: false,
        addErr: action.errMsg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default userPolicyReducer;
