import { call, put, takeEvery, all } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import apis from "../../constants/apis";

function* userRegister(action) {
  const { userData } = action.payload;
  try {
    const res = yield call(() => apis.post(`users/signup`, userData));
    yield put({
      type: actionType.REGISTRATION_SUCCESS,
      payload: res.data,
      succMsg: "You have successfully Registered.",
    });
  } catch (err) {
    yield put({
      type: actionType.REGISTRATION_FAIL,
      errMsg: err.message,
    });
  }
}

function* userRegisterSaga() {
  yield takeEvery(actionType.REGISTRATION_REQUESTED, userRegister);
}

function* userLogin(action) {
  const { data } = action.payload;

  try {
    const res = yield call(() => apis.post(`users/signin`, data));
    yield put({
      type: actionType.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.LOGIN_FAILED,
      errMsg: err.message,
    });
  }
}

function* loginUserSaga() {
  yield takeEvery(actionType.LOGIN_REQUESTED, userLogin);
}
export default function* userSaga() {
  yield all([userRegisterSaga(), loginUserSaga()]);
}
