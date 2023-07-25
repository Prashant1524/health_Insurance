import * as actionType from "../actions/actionTypes";

const initialState = {
  announceData: null,
  loading: false,
  err: null,
  addSucc: null,
  addErr: null,
  addLoading: false,
  positionData: null,
  addPosErr: null,
  addPosSucc: null,
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ANNOUNCEMENT_REQUESTED: {
      return {
        ...state,
      };
    }
    case actionType.GET_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        announceData: action.payload,
      };
    }
    case actionType.GET_ANNOUNCEMENT_FAIL: {
      return {
        ...state,
        loading: false,
        err: action.errMsg,
      };
    }
    case actionType.ADD_ANNOUNCEMENT_REQUESTED: {
      return {
        ...state,
        addLoading: true,
      };
    }
    case actionType.ADD_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        addLoading: false,
        addSucc: "Announcement added",
      };
    }
    case actionType.ADD_ANNOUNCEMENT_FAIL: {
      return {
        ...state,
        addLoading: false,
        addErr: action.errMsg,
      };
    }
    case actionType.RESET_ANN_MSG: {
      return {
        ...state,
        addErr: null,
        addSucc: null,
      };
    }
    case actionType.GET_POSITION_REQUESTED: {
      return {
        ...state,
      };
    }
    case actionType.GET_POSITION_SUCCESS: {
      return { ...state, positionData: action.payload };
    }
    case actionType.GET_POSITION_FAILED: {
      return {
        ...state,
        posErr: action.errMsg,
      };
    }
    case actionType.ADD_POSITION_REQUESTED: {
      return {
        ...state,
      };
    }
    case actionType.ADD_POSITION_SUCCESS: {
      return {
        ...state,
        addPosSucc: action.payload,
      };
    }
    case actionType.ADD_POSITION_FAILED: {
      return {
        ...state,
        addPosErr: action.errMsg,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default announcementReducer;
