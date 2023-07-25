import { call, put, takeEvery, all } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import apis from "../../constants/apis";

function* adminLogin(action) {
  const { data } = action.payload;

  try {
    const res = yield call(() => apis.post(`users/admin/signin`, data));
    yield put({
      type: actionType.ADMIN_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: actionType.ADMIN_LOGIN_FAILED,
      errMsg: err.message,
    });
  }
}

function* loginAdminSaga() {
  yield takeEvery(actionType.ADMIN_LOGIN_REQUESTED, adminLogin);
}

export default function* adminSaga() {
  yield all([loginAdminSaga()]);
}
