import * as actionType from "../actions/actionTypes";

const initialState = {
  testimonialData: null,
  testimonialLoading: false,
  testimonialErr: null,
  testLoading: false,
  testSucc: null,
  testErr: null,
  updateLoading: false,
  updateSucc: null,
  updateErr: null,
  delLoading: false,
  delSucc: null,
  delErr: null,
};

const testimonialReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_REVIEW_REQUESTED: {
      return {
        ...state,
        testimonialLoading: true,
      };
    }
    case actionType.GET_REVIEW_SUCCESS: {
      return {
        ...state,
        testimonialData: action.payload,
      };
    }
    case actionType.GET_REVIEW_FAILED: {
      return {
        ...state,
        testimonialErr: action.errMsg,
      };
    }
    case actionType.ADD_REVIEW_REQUESTED: {
      return {
        ...state,
        testLoading: true,
      };
    }
    case actionType.ADD_REVIEW_SUCCESS: {
      return {
        ...state,
        testSucc: "Review added",
      };
    }
    case actionType.ADD_REVIEW_FAILED: {
      return {
        ...state,
        testErr: action.errMsg,
      };
    }
    case actionType.UPDATE_TESTIMONIAL_REQUESTED: {
      return {
        ...state,
        updateLoading: true,
      };
    }
    case actionType.UPDATE_TESTIMONIAL_SUCCESS: {
      return {
        ...state,
        updateSucc: "Testimonial Approved Successfully.",
      };
    }
    case actionType.UPDATE_TESTIMONIAL_FAILED: {
      return {
        ...state,
        updateErr: action.errMsg,
      };
    }
    case actionType.DELETE_TESTIMONIAL_REQUESTED: {
      return {
        ...state,
        delLoading: true,
      };
    }
    case actionType.DELETE_TESTIMONIAL_SUCCESS: {
      return {
        ...state,
        delSucc: "Testimonial Deleted Successfully",
      };
    }
    case actionType.DELETE_TESTIMONIAL_FAILED: {
      return {
        ...state,
        delErr: action.errMsg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default testimonialReducer;
