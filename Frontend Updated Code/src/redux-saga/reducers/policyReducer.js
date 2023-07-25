import * as actionType from "../actions/actionTypes";

const initialState = {
  policyList: null,
  policyLoading: false,
  policyErr: null,
  addPolicySucc: null,
  addPolicyErr: null,
  addLoading: false,
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_POLICIES_REQUESTED: {
      return {
        ...state,
        policyLoading: true,
      };
    }
    case actionType.GET_POLICIES_SUCCESS: {
      return {
        ...state,
        policyList: action.payload,
        policyLoading: false,
      };
    }
    case actionType.GET_POLICIES_FAILED: {
      return {
        ...state,
        policyErr: action.errMsg,
        policyLoading: false,
      };
    }
    case actionType.ADD_NEW_POLICY_REQUESTED: {
      return {
        ...state,
        addLoading: true,
      };
    }
    case actionType.ADD_NEW_POLICY_SUCCESS: {
      return {
        ...state,
        addPolicySucc: action.payload,
        addLoading: false,
      };
    }
    case actionType.ADD_NEW_POLICY_FAILED: {
      return {
        ...state,
        addPolicyErr: action.errMsg,
        addLoading: false,
      };
    }
    case actionType.RESET_POLICY_MSG: {
      return {
        ...state,
        addPolicyErr: null,
        addPolicySucc: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default policyReducer;
