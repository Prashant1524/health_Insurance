import { call, put, takeEvery, all } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import apis from "../../constants/apis";

function* getAllPolicy(action) {
  const { jwtToken } = action.payload;
  try {
    const res = yield call(() => apis.get(`/policy/getAllPolicyPlans`));
    yield put({
      type: actionType.GET_POLICIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.GET_POLICIES_FAILED,
      errMsg: err.message,
    });
  }
}

function* getAllPolicySaga() {
  yield takeEvery(actionType.GET_POLICIES_REQUESTED, getAllPolicy);
}

function* addNewPolicy(action) {
  const { policyData, jwtToken } = action.payload;
  try {
    const res = yield call(() =>
      apis.post(`/policy/addPolicy`, policyData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    );
    yield put({
      type: actionType.ADD_NEW_POLICY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: actionType.ADD_NEW_POLICY_FAILED,
      errMsg: error.message,
    });
  }
}

function* addNewPolicySaga() {
  yield takeEvery(actionType.ADD_NEW_POLICY_REQUESTED, addNewPolicy);
}

export default function* policySaga() {
  yield all([getAllPolicySaga(), addNewPolicySaga()]);
}
