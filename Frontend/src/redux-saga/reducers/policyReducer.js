import * as actionType from "../actions/actionTypes";

const initialState = {
  message: null,
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TEST_REQUESTED: {
      return {
        ...state,
        message: action.payload,
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
