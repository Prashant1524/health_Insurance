import { call, put, takeEvery, all } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import apis from "../../constants/apis";

function* getAllUserPolicy(action) {
  const { email, jwtToken } = action.payload;
  try {
    const res = yield call(() =>
      apis.get(`/userpolicies/findByEmail/${email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.GET_USER_POLICIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_USER_POLICIES_FAILED,
      errMsg: err.message,
    });
  }
}

function* getAllUserPolicySaga() {
  yield takeEvery(actionType.GET_USER_POLICIES_REQUESTED, getAllUserPolicy);
}

function* addNewUserPolicy(action) {
  const { policyData, jwtToken } = action.payload;
  try {
    const res = yield call(() =>
      apis.post(`/userpolicies/add`, policyData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.ADD_USER_POLICIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.ADD_USER_POLICIES_FAILED,
      errMsg: error.message,
    });
  }
}

function* addNewUserPolicySaga() {
  yield takeEvery(actionType.ADD_USER_POLICIES_REQUESTED, addNewUserPolicy);
}

export default function* userPolicySaga() {
  yield all([getAllUserPolicySaga(), addNewUserPolicySaga()]);
}
